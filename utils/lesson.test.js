const lesson = require('./lesson');

describe('lesson', () => {
  test('convertTimeToSeconds', () => {
    const timeSampleOne = '10m5s';
    const timeSampleTwo = '10m';
    const timeSampleThree = '5s';
    const timeSampleFour = '4m14s';

    const expectedResultOne = 605;
    const expectedResultTwo = 600;
    const expectedResultThree = 5;
    const expectedResultFour = 254;
    const expectedResultFive = 254;
    const expectedResultSix = 254;

    const resultOne = lesson.convertTimeToSeconds(timeSampleOne);
    const resultTwo = lesson.convertTimeToSeconds(timeSampleTwo);
    const resultThree = lesson.convertTimeToSeconds(timeSampleThree);
    const resultFour = lesson.convertTimeToSeconds(timeSampleFour);
    const resultFive = lesson.convertTimeToSeconds(timeSampleFour);
    const resultSix = lesson.convertTimeToSeconds(timeSampleFour);

    expect(expectedResultOne).toBe(resultOne);
    expect(expectedResultTwo).toBe(resultTwo);
    expect(expectedResultThree).toBe(resultThree);
    expect(expectedResultFour).toBe(resultFour);
    expect(expectedResultFive).toBe(resultFour);
    expect(expectedResultSix).toBe(resultFour);
  });
});
