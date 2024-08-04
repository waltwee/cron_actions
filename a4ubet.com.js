import cron from 'node-cron';
import path from 'node:path';
import { redirectOutputToFile, __dirname, __filename } from '../Config/logConfig.js';
import { runAPITest } from '../Config/apiTestRunner.js';
import { a4ubetApiUrl , a4ubetBaseUrl  } from '../Tests/apiUrl/apiConfig.js'


// Перенаправление stdout и stderr в файл
redirectOutputToFile();

const apiConfig = {
    apiUrl: `${a4ubetApiUrl}/api/sign-in`,
    username: 'player-798945',
    password: 'player1144U##246',
    successMessage: 'API Login test successful (a4ubet.com)',
    failureMessage: 'Error: API test failed (a4ubet.com)'
};

cron.schedule('*/5 * * * * *', async () => {
    const filePath = path.join(__dirname, './Tests/Tokens/a4ubet.com.json')
    //console.log('Start of API login test at :', new Date(), filePath );
    await runAPITest(
        apiConfig.apiUrl,
        apiConfig.username,
        apiConfig.password,
        apiConfig.successMessage,
        apiConfig.failureMessage,
        { origin: a4ubetBaseUrl},
        filePath
    );
});
