import HolidayService from './services/holiday-service';

const baseURL = 'http://localhost:3000/api/holidays';

const holidayService = new HolidayService(baseURL);

async function main() {
  try {
    await holidayService.saveHolidaysToYAML();
  } catch (error) {
    console.error('Error during operation:', error);
  }
}

main();


// const holidayService = new HolidayService(baseURL);
// holidayService.saveHolidaysToYAML();

