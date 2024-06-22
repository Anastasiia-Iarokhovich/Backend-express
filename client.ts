import axios from 'axios';
import * as fs from 'fs';
import * as yaml from 'js-yaml';

// const baseURL = 'http://localhost:3000/api/holidays';

const baseURL = 'http://localhost:3000/api/holidays/holiday/list';

async function fetchHolidays(): Promise<any[]> {
  try {
    const response = await axios.get(`${baseURL}`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch holidays:', error);
    return [];
  }
}

async function saveHolidaysToYAML() {
  const holidays = await fetchHolidays();
  const yamlData = yaml.dump(holidays);
  fs.writeFileSync('holidays.yaml', yamlData);
  console.log('Holidays saved to holidays.yaml');
}

saveHolidaysToYAML();
