import { ApplicationConstructor, Application } from './application';
import { FilePath, readPackage, ApplicationPackage } from './application-package';
import { logger } from './logger';
import * as apm from 'elastic-apm-node'

export async function createApplication(ApplicationLike: ApplicationConstructor, applicationPath: FilePath, port?: number): Promise<string> {
  const applicationPackage: ApplicationPackage = await readPackage(applicationPath);
  const application = new ApplicationLike(applicationPackage, applicationPath, port);
  const { name: serviceName, version: serviceVersion } = applicationPackage;

  apm.start({ logger, serviceName, serviceVersion });

  return application.start();
}
