interface ExerciseHourResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number | undefined;
    ratingDescription: string | undefined;
    target: number;
    average: number;
  }
  interface Props {
    hours: number[];
    target: number;
  }
   export const calculateExercises = (hours: number[],target: number): ExerciseHourResult => {
    if (!target || hours.length === 0) {
      throw "parameters missing";
    }
    if (Number.isNaN(Number(target)) || !Array.isArray(hours) || hours.some((e) => isNaN(e))) {
      throw "malformatted parameters";
    }
    const periodLength = hours.length;
    const trainingDays = hours.filter((exerciseHour) => exerciseHour > 0)
      .length;
    const average =
      hours.reduce((a, b) => a + b, 0) / hours.length;
    const success = average >= target;
    let rating;
    let ratingDescription;
    if (average < target) {
      rating = 1;
      ratingDescription = `Nice try, next week will be your week!`;
    } else if (target === average) {
      rating = 2;
      ratingDescription = `Well done, you are on a right pace!`;
    } else if (average > target) {
      rating = 3;
      ratingDescription = `Well done! You are pro`;
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target,
      average,
    };
  };
  const parseArgumentss = (args: Array<string>): Props => {
    if (args.length < 4) throw new Error('Not enough arguments');
   let target = -9999;
   let hours: number[] = [];
    if (!isNaN(Number(args[2]))) {
    target=Number(args[2]);
    }
    args.slice(3).forEach(i=>{
        console.log(i);
        if  (!isNaN(Number(i))) ( hours = hours.concat([Number(i)]));
    });
    if (target !== -9999 && hours) return {hours,target};
    else {
      throw new Error('Provided values were not numbers!');
    }
  };
  try {
    const argumentss = parseArgumentss(process.argv);
console.log(calculateExercises(argumentss.hours,argumentss.target));}
catch(e) { console.log(e);}
