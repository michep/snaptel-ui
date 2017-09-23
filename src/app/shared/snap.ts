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
  workflow: any;
  schedule: any;
}

export interface SnapServer {
  key?: string;
  host: string;
  port: number;
  proto: string;
  available?: boolean;
}
