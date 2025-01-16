import * as Font from 'expo-font';
import AlatsiRegular from '../../assets/fonts/AlatsiRegular.ttf';
import AmiriQuranRegular from "../../assets/fonts/AmiriQuranRegular.ttf";
import AoboshiOneRegular from "../../assets/fonts/AoboshiOneRegular.ttf";
import AverageSansRegular from "../../assets/fonts/AverageSansRegular.ttf";
import Inter18ptBlackItalic from "../../assets/fonts/Inter18ptBlackItalic.ttf";
import Inter18ptBlackMedium from "../../assets/fonts/Inter18ptMedium.ttf";
import Inter18ptBlackRegular from "../../assets/fonts/Inter18ptRegular.ttf";
import ManjariBold from "../../assets/fonts/ManjariBold.ttf";
import ManropeExtraBold from "../../assets/fonts/ManropeExtraBold.ttf";
import ManropeRegular from "../../assets/fonts/ManropeRegular.ttf";
import RobotoCondensedRegular from "../../assets/fonts/RobotoCondensedRegular.ttf";
import RobotoCondensedSemiBold from "../../assets/fonts/RobotoCondensedSemiBold.ttf";
import RobotoExtraLight from "../../assets/fonts/RobotoExtraLight.ttf";
import RubikMedium from "../../assets/fonts/RubikMedium.ttf";

const loadFonts = async () => {
    await Font.loadAsync({
        'Alatsi-Regular': AlatsiRegular,
        'AmiriQuran-Regular': AmiriQuranRegular,
        'AoboshiOne-Regular': AoboshiOneRegular,
        'AverageSans-Regular': AverageSansRegular,
        'Inter18pt-BlackItalic': Inter18ptBlackItalic,
        'Inter18pt-BlackMedium': Inter18ptBlackMedium,
        'Inter18pt-BlackRegular': Inter18ptBlackRegular,
        'Manjari-Bold': ManjariBold,
        'Manrope-ExtraBold': ManropeExtraBold,
        'Manrope-Regular': ManropeRegular,
        'RobotoCondensed-Regular': RobotoCondensedRegular,
        'RobotoCondensed-SemiBold': RobotoCondensedSemiBold,
        'RobotoExtra-Light': RobotoExtraLight,
        'Rubik-Medium': RubikMedium
    });
};


export default loadFonts