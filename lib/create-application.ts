import { ApplicationConstructor } from './application';
import { FilePath, readPackage, ApplicationPackage } from './application-package';

export async function createApplication(ApplicationLike: ApplicationConstructor, applicationPath: FilePath, port?: number): Promise<string> {
  const applicationPackage: ApplicationPackage = await readPackage(applicationPath);
  const application = new ApplicationLike(applicationPackage, applicationPath, port);

  return application.start();
}
