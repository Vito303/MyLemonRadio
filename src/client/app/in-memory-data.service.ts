
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { createTestStations, createTestStream } from './test-data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { stations: createTestStations(), streams: createTestStream() };
  }
}