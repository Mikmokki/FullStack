interface Values {
    value1: number;
    value2: number;
  }
const calculateBmi= (height: number, weight: number):string => {
    const bmi = weight/(height*height/10000);
    if (bmi < 16) {
        return "Underweight (Severe thinness)";
      } else if (bmi >= 16 && bmi < 17) {
        return "Underweight (Moderate thinness)";
      } else if (bmi >= 17 && bmi < 18.5) {
        return "Underweight (Mild thinness)";
      } else if (bmi >= 18.5 && bmi < 25) {
        return "Normal (healthy weight)";
      } else if (bmi >= 25 && bmi < 30) {
        return "Overweight";
      } else if (bmi >= 30 && bmi < 35) {
        return "Obese Class I (Moderately obese)";
      } else if (bmi >= 35 && bmi < 40) {
        return "Obese Class II (Severely obese)";
      } else {
        return "Obese Class III (Very severely obese)";
      }
    };
    const parseArguments = (args: Array<string>): Values => {
        if (args.length < 4) throw new Error('Not enough arguments');
        if (args.length > 4) throw new Error('Too many arguments');
      
        if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
          return {
            value1: Number(args[2]),
            value2: Number(args[3]),
          };
        } else {
          throw new Error('Provided values were not numbers!');
        }
      };
      
    export const parseAndCalculate = (args: Array<string>) => {try {
      const values:Values = parseArguments(args);
 return calculateBmi(values.value1,values.value2);
}
  catch(e) { return console.log(e);}};
  console.log(parseAndCalculate(process.argv));

