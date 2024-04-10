
import { CPUInfo, CpuCoreRecords, CpuCoreUsageRecorders, CpuCoresNames, CpuUsageRecorder, SystemInfo, MemoryRecords, Memory } from "@/interface";
import { get_system_info } from "@/invoke";
import { useState, useEffect, useRef, useCallback } from "react";
import { formatTime } from "@/utils";

interface SystemInfoState {
	systemInfo: SystemInfo | undefined;
	loading: boolean;
	initializing: boolean;
	cpuCores: CpuCoreRecords,
	cpuUsage: CpuCoreUsageRecorders,
	cpuCoresNames: CpuCoresNames,
	memories: MemoryRecords
}

const counts = 60



export const useSystemInfo = (): SystemInfoState => {
	const [initializing, setInitializing] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [systemInfo, setSystemInfo] = useState<SystemInfo | undefined>();
	const cpuCores = useRef<CpuCoreRecords>(new Map());
	const cpuCoresNames = useRef<CpuCoresNames>([]);
	const cpuUsage = useRef<CpuCoreUsageRecorders>([]);
	const memories = useRef<MemoryRecords>([]);
	const intervalId = useRef<NodeJS.Timeout>();

	const generatorCpus = useCallback((newRecorder: CPUInfo[], time: string) => {
		const { current } = cpuCores

		// 如果没有初始化过则先初始化一次
		const initCpuCores = (newRecorder: CPUInfo[]): {
			cpuUsage: CpuCoreUsageRecorders,
			cpuCores: CpuCoreRecords,
			cpuCoresNames: CpuCoresNames
		} => {
			const cpuUsage: CpuCoreUsageRecorders = []
			const cpuCores: CpuCoreRecords = new Map()
			const cpuCoresNames: CpuCoresNames = []
			const item: CpuUsageRecorder = {
				time,
			}

			newRecorder.forEach(({ name, cpu_usage }) => {
				cpuCores.set(name, [{ time, cpu_usage }])
				const value = parseFloat(cpu_usage.toFixed(2))
				item[name] = value
				cpuCoresNames.push(name)
			})
			cpuUsage.push(item)
			return {
				cpuUsage,
				cpuCores,
				cpuCoresNames
			}
		}


		const appendOrUpdate = (newRecorder: CPUInfo[]): {
			cpuUsage: CpuCoreUsageRecorders,
			cpuCores: CpuCoreRecords
		} => {
			const _cpuUsage: CpuCoreUsageRecorders = cpuUsage.current
			const _cpuCores: CpuCoreRecords = new Map(cpuCores.current)
			const newNode: CpuUsageRecorder = { time }
			newRecorder.forEach(({ name, cpu_usage }) => {
				const oldValue = _cpuCores.get(name)!
				const value = parseFloat(cpu_usage.toFixed(2))
				newNode[name] = value
				if (oldValue?.length <= counts) {
					oldValue?.push({ time, cpu_usage: value })
				} else {
					oldValue?.shift()
					oldValue?.push({ time, cpu_usage: value })
				}
				// 需要设置一个新值触发更新
				_cpuCores.set(name, [...oldValue])
			});
			if (_cpuUsage?.length <= counts) {
				_cpuUsage?.push(newNode)
			} else {
				_cpuUsage?.shift()
				_cpuUsage?.push(newNode)
			}
			return { cpuUsage: [..._cpuUsage], cpuCores: _cpuCores }
		}



		if (current.size === 0) {
			const { cpuUsage: _cpuUsage, cpuCores: _cpuCores, cpuCoresNames: _cpuCoresNames } = initCpuCores(newRecorder)
			cpuCores.current = _cpuCores
			cpuUsage.current = _cpuUsage
			cpuCoresNames.current = _cpuCoresNames
			return
		} else {
			const { cpuUsage: _cpuUsage, cpuCores: _cpuCores } = appendOrUpdate(newRecorder)
			cpuCores.current = _cpuCores
			cpuUsage.current = _cpuUsage
		}
	}, [])


	const generatorMemories = useCallback((used_memory: Memory, total_memory: Memory, time: string) => {
		const { current } = memories
		const recorder = { time, value: used_memory }
		if (current.length === 0) {
			memories.current = [recorder]
			return
		} else {
			if (current?.length <= counts) {
				current?.push(recorder)
			} else {
				current?.shift()
				current?.push(recorder)
			}
		}
		memories.current = [...current]
	}, [])

	useEffect(() => {
		const loadData = async () => {
			setLoading(true);
			const result = await get_system_info();
			console.log(result);

			const { cpus, total_memory, used_memory } = result;

			const now = formatTime(new Date(), 'mm:ss')
			generatorCpus(cpus, now)
			generatorMemories(used_memory, total_memory, now)
			setSystemInfo(result);
			setLoading(false);
		}


		const init = async () => {
			setInitializing(true);
			await loadData()
			setInitializing(false);
			if (!intervalId.current) {
				intervalId.current = setInterval(async () => {
					await loadData()
				}, 1000);
			}
		};

		init()
		return () => {
			if (intervalId.current) {
				clearInterval(intervalId.current);
			}
		};
	}, [generatorCpus]);

	useEffect(() => {
		return () => {
			try {
				if (intervalId.current) {
					clearInterval(intervalId.current);
				}
			} catch (error) {

			}
		};
	}, [])



	return {
		initializing,
		loading,
		systemInfo,
		cpuCores: cpuCores.current,
		cpuUsage: cpuUsage.current,
		cpuCoresNames: cpuCoresNames.current,
		memories: memories.current
	}
}
