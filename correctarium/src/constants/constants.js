const PORT = 3000;
const MIN_UKR_RUS = 50;
const MIN_EN = 120;
const MIME_TYPE = ['none', 'doc', 'docx', 'rtf'];
const MULTIPLICATION_FOR_OTHER_FILE_TYPE = 1.2;
const EN_PRICE = 1.2;
const UKR_RUS_PRICE = 0.5;
const START_WORKING_DAY = 10;
const END_WORKING_DAY = 19;
const MIN_PROCESSING_TIME_ONE_TASK = 1;
const BASE_TIME_FOR_PROCESS_ONE_TASK = 0.5;
const ONE_WORKING_DAY_IN_MS = 32400000;
const MS_IN_HOUR = 3600000;
const MS_iN_MINUTE = 60000;
const EN_MS_FOR_ONE_CHAR = (60 * MS_iN_MINUTE) / 333;
const UKR_RUS_MS_FOR_ONE_CHAR = (60 * MS_iN_MINUTE) / 1333;

module.exports = {
    PORT,
    MIN_UKR_RUS,
    MIN_EN,
    MIME_TYPE,
    MULTIPLICATION_FOR_OTHER_FILE_TYPE,
    EN_PRICE,
    UKR_RUS_PRICE,
    START_WORKING_DAY,
    END_WORKING_DAY,
    MIN_PROCESSING_TIME_ONE_TASK,
    BASE_TIME_FOR_PROCESS_ONE_TASK,
    EN_MS_FOR_ONE_CHAR,
    UKR_RUS_MS_FOR_ONE_CHAR,
    ONE_WORKING_DAY_IN_MS,
    MS_IN_HOUR,
    MS_iN_MINUTE,
}
