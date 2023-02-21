/**
 * All imports used here are also available via the npm package.
 * https://www.npmjs.com/package/%40handtracking.io/yoha
 */
import {
  DownloadMultipleYohaTfjsModelBlobs,
  StartTfjsWebglEngine,
  IDownloadProgressCb,
  ITrackResultCb,
  ITrackSource,
  IEngineConfig,
} from '@handtracking.io/yoha';

import { CreateDrawDemo } from './draw';

async function Run() {
  CreateDrawDemo(async (src, config, progressCb, resultCb) => {
    const modelBlobs = await DownloadMultipleYohaTfjsModelBlobs('box/model.json', 'lan/model.json', progressCb);
    StartTfjsWebglEngine(config, src, modelBlobs, resultCb);
  });
}

Run();
