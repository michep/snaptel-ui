export interface SnapTask {
  id: string;
  name: string;
  deadline: string;
  creation_timestamp: number;
  last_run_timestamp: number;
  hit_count: number;
  miss_count: number;
  failed_count: number;
  last_failure_message: string;
  task_state: string;
  href: string;
}

export interface SnapTaskInfo extends SnapTask {
  workflow: SnapTaskWorkflow;
  schedule: SnapTaskSchedule;
}

interface SnapTaskSchedule {
  type: string;
  interval?: string;
  count?: number;
}

interface SnapTaskWorkflow {
  collect: SnapTaskWorkflowCollect;
}

interface SnapTaskWorkflowCollect {
  metrics: any;
  config?: any;
  tags?: any;
  process?: any;
  publish?: any;
}

export interface SnapServer {
  key?: string;
  host: string;
  port: number;
  proto: string;
  available?: boolean;
}

export interface SnapMetric {
  last_advertised_timestamp: number;
  namespace: string;
  version: number;
  dynamic: boolean;
  href: string;
}

export interface SnapPlugin {
  name: string;
  version: number;
  type: string;
  signed: boolean;
  status: string;
  loaded_timestamp: number;
  href: string;
}
