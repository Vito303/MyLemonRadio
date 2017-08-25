
import { InMemoryDbService } from 'angular-in-memory-web-api';

import { createTestStations } from './test-data';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    return { stations: createTestStations() };
  }
}