import { Logger } from '@nestjs/common';

export const isTargetVersion = (
  appVersion: string,
  targetIOSAppVersion: string,
  targetAndroidAppVersion: string,
): boolean => {
  if (targetIOSAppVersion === undefined || targetAndroidAppVersion === undefined || appVersion === undefined) {
    Logger.warn('Please set the env variables MOBILE_CURRENT_IOS_APP_VERSION and MOBILE_CURRENT_ANDROID_APP_VERSION');
    return false;
  }

  const isIOS = !appVersion?.includes('.');

  if (isIOS) {
    // normalize minimum ios
    const normalizedAppVersion: number = undefined !== appVersion ? parseInt(appVersion.replace(/\./g, ''), 10) : 0;

    const normalizedTargetIos = targetIOSAppVersion.replace(/\./g, '');
    return parseInt(normalizedTargetIos, 10) <= normalizedAppVersion;
  }

  const appVersionList = appVersion.split('.').map(value => {
    return parseInt(value, 10);
  });
  const targetAndroidAppVersionList = targetAndroidAppVersion.split('.').map(value => {
    return parseInt(value, 10);
  });

  if (appVersionList[0] > targetAndroidAppVersionList[0]) {
    return true;
  }

  if (appVersionList[0] < targetAndroidAppVersionList[0]) {
    return false;
  }

  if (appVersionList[1] < targetAndroidAppVersionList[1]) {
    return false;
  }

  if (appVersionList[1] > targetAndroidAppVersionList[1]) {
    return true;
  }

  if (appVersionList[2] < targetAndroidAppVersionList[2]) {
    return false;
  }

  return appVersionList[2] >= targetAndroidAppVersionList[2];
};
