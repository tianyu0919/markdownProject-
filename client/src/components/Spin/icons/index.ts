/*
 * @Author: 归宿
 * @Date: 2022-08-12 17:14:09
 * @Description: 
 */
import TwoBalls from './TwoBalls';
import ThreeBalls from './ThreeBalls';

interface Types {
  [prop: string]: React.FC
}

const themes: Types = {
  "twoBalls": TwoBalls,
  "threeBalls": ThreeBalls
}

export default themes