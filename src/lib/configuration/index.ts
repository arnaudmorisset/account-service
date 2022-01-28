import Configuration from "../../../config.json";

export interface WebConfig {
  port: number
}

export interface Config {
  web: WebConfig
}

const load = (): Config => Configuration;

export default { load }
