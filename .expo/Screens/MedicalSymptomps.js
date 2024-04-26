import { StyleSheet, Text, View, Platform, TouchableOpacity,ActivityIndicator } from 'react-native';
import AppTextInput from '../Components/AppTextInput';
import AppButton from '../Components/AppButton';
import { useEffect,useState } from 'react';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import { OverlayView } from '../Components/AppOverlayScreen';
import {getFirestore, collection, query, getDoc,doc,addDoc,setDoc, getDocs,where} from "firebase/firestore";
import AppPicker from '../Components/AppPicker';
const MedicalSymptomps = ({ route,navigation }) => {
    const [zone,setZone] = useState('');
    const [zone_1, setZone_1] = useState('');
    const [zone_2, setZone_2] = useState(''); 
    const [isInjured, setIsInjured] = useState('');
    const [painLevel, setPainLevel] = useState('');
    const [name,setName] = useState('');
    const [lastName,setLastName] = useState('');
    const medicalData = {
        zone: zone ? zone.value : undefined,
        zone_1: zone_1 ? zone_1.label : undefined,
        zone_2: zone_2 ? zone_2.label : undefined,
        isInjured: isInjured ? isInjured.value : undefined,
        painLevel: painLevel ? painLevel.value : undefined,
      };
    

    const zoneOptions = {
        initial:[
            {label: "Head", value:"head"},
            {label: "Neck", value:"neck"},
            {label: "Body", value:"body"},
            {label: "Hands", value:"hands"},
            {label: "Legs", value:"legs"}
        ],
        head: [
            { label: "Eyes", value: "eyes" },
            { label: "Ears", value: "ears" },
            { label: "Nose", value: "nose" },
            { label: "Mouth", value: "mouth" },
            { label: "Skull", value: "skull" }
          ],
        neck: [
            { label: "Throat", value: "throat" }, // Gât
            { label: "Nape", value: "nape" }, // Ceafă
            { label: "Cervical spine", value: "cervical_spine" }, // Coloana cervicală
            { label: "Lymph nodes", value: "lymph_nodes" }, // Ganglionii limfatici
          ],
        body: [
            { label: "Chest", value: "chest" }, // Piept
            { label: "Abdomen", value: "abdomen" }, // Abdomen
            { label: "Back", value: "back" }, // Spate
            { label: "Pelvis", value: "pelvis" }, // Pelvis
            { label: "Shoulders", value: "shoulders" }, // Umeri
          ],
        hands: [
            { label: "Fingers", value: "fingers" }, // Degete
            { label: "Palms", value: "palms" }, // Palme
            { label: "Wrists", value: "wrists" }, // Încheieturi
            { label: "Forearms", value: "forearms" }, // Antebrațe
            { label: "Elbows", value: "elbows" }, // Coate
            { label: "Upper arms", value: "upper_arms" }, // Brațe (partea superioară)
          ],
        legs: [
            { label: "Thighs", value: "thighs" }, // Coapse
            { label: "Knees", value: "knees" }, // Genunchi
            { label: "Calves", value: "calves" }, // Gamba
            { label: "Ankles", value: "ankles" }, // Gleznă
            { label: "Toes", value: "toes" }, // Degete de la picioare
          ],
        mouth: [
            { label: "Teeth", value: "teeth" }, // Dinți
            { label: "Gums", value: "gums" }, // Gingii
            { label: "Tongue", value: "tongue" }, // Limbă
            { label: "Inner cheeks", value: "inner_cheeks" }, // Obraji (interior)
            { label: "Lips", value: "lips" }, // Buze
            { label: "Tonsils", value: "tonsils" }, // Amigdale
        ],
        skull: [
            { label: "Frontal Region", value: "frontal" }, // Regiunea Frontală
            { label: "Temporal Region", value: "temporal" }, // Regiunea Temporală
            { label: "Occipital Region", value: "occipital" }, // Regiunea Occipitală
            { label: "Parietal Region", value: "parietal" }, // Regiunea Parietală
            { label: "Orbital/Sinus Area", value: "orbital_sinus" }, // Zona Orbitelor/Sinusurilor
            { label: "Cervicogenic Headache", value: "cervicogenic" }, // Cefaleea Cervicogenă
          ],
        injuired:[
            {label:"Yes", value:"yes"},
            {label:"No", value:"no"},
        ],
        painLevels : [
            { label: "Very Low", value: "very_low" },
            { label: "Low", value: "low" },
            { label: "Moderate", value: "moderate" },
            { label: "High", value: "high" },
            { label: "Very High", value: "very_high" },
        ],
    };

    const verifyItems = () =>{
        console.log(zone.value);
        console.log(zone_1.value);
        if(zone_2) console.log(zone_2.value);
        if(isInjured) console.log(isInjured.value);
        if(painLevel) console.log(painLevel.value);
        
        
    }
    const goToMedicalConclusionsScreen = () => {
        const medicalDataJSON = JSON.stringify(medicalData);
        const { lastName, name } = route.params;
        setLastName(lastName);
        setName(name);
        navigation.navigate('MedicalConclusions',{medicalDataJSON,name,lastName});
      };
    const getZoneOptions = (z) => {
        return zoneOptions[z.value] || [];
      };
    return (
    <View style={styles.container}>
        <Text style = {styles.text}>Where is the pain located?</Text>
        <AppPicker items={zoneOptions.initial} placeholder="Please select one"selectedItem = {zone} onSelectItem = {(item) => {setZone(item);setZone_1('');setIsInjured('');setZone_2('');setPainLevel('');}}/>

        {zone && <Text style = {styles.text}>What part of {zone.label} hurts?</Text>}
        {zone && <AppPicker items={getZoneOptions(zone)} placeholder="Please select one"selectedItem = {zone_1} onSelectItem = {(item) => {setZone_1(item);setZone_2('');setIsInjured('');setPainLevel('');}}/>}
        
        {(zone_1.value ==="mouth"||zone_1.value ==="skull") && <Text style = {styles.text}>What part of {zone_1.label} hurts?</Text>}
        
        {zone_1.value ==="mouth" && <AppPicker items={getZoneOptions(zone_1)} placeholder={`Please select one`}selectedItem = {zone_2} onSelectItem = {(item) => {setZone_2(item);setPainLevel('');}}/>}
        {zone_1.value ==="skull" && <AppPicker items={getZoneOptions(zone_1)} placeholder={`Please select one`}selectedItem = {zone_2} onSelectItem = {(item) => {setZone_2(item);setPainLevel('');}}/>}
        

        {(zone_1.value ==="skull" || zone_1.value ==="mouth")&&zone_2 && <Text style = {styles.text}>Did you injuired your {zone_2.label} recently?</Text>}
        {(zone_1.value ==="skull" || zone_1.value ==="mouth") && zone_2
        && <AppPicker items={zoneOptions.injuired} placeholder={`Please select one`}selectedItem = {isInjured} onSelectItem = {(item) => {setIsInjured(item);setPainLevel('');}}/>}
        
        {!((zone_1.value ==="skull" || zone_1.value ==="mouth") || zone_2)&&zone_1 && <Text style = {styles.text}>Did you injuired your {zone_1.label} recently?</Text>}
        {!((zone_1.value ==="skull" || zone_1.value ==="mouth") || zone_2)&&zone_1 && <AppPicker items={zoneOptions.injuired} placeholder={`Please select one`}selectedItem = {isInjured} onSelectItem = {(item) => {setIsInjured(item);setPainLevel('');}}/>}
        
        {isInjured && <Text style = {styles.text}>How severe is your pain?</Text>}
        {isInjured && <AppPicker items={zoneOptions.painLevels} placeholder="How severe is your pain?"selectedItem = {painLevel} onSelectItem = {(item) => setPainLevel(item)}/>}
        <AppButton title="Next" onPress={goToMedicalConclusionsScreen}/>

    </View>
    );
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopWidth: 1,  
      borderTopColor: '#D3D3D3',
      borderTopStyle: 'solid',
    },
    text:{
        fontSize: 20,
        fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
        alignSelf:'flex-start',
        paddingLeft:15,
        paddingTop:10,
      },
    fullScreenCentered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
  });
export default MedicalSymptomps;