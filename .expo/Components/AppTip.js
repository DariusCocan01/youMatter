import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AppTip = ({ trigger,...props }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [tip, setTip] = useState('');

    const tips = [
        "Drink at least 8 glasses of water a day to stay hydrated.",
        "Take a brisk 30-minute walk daily to boost your cardiovascular health.",
        "Add a serving of vegetables to every meal to increase your fiber intake.",
        "Practice mindfulness or meditation for 10 minutes each day to reduce stress.",
        "Limit processed foods and sugars to decrease your risk of chronic diseases.",
        "Get at least 7-8 hours of sleep each night to support overall health.",
        "Use sunscreen every day, even when it's cloudy, to protect your skin.",
        "Try to stand up and stretch every hour if you work at a desk.",
        "Incorporate whole grains into your diet to improve digestion.",
        "Laugh more! Laughter boosts your immune system and mood.",
        "Swap out salt for herbs and spices to enhance flavor without raising blood pressure.",
        "Eat fatty fish twice a week for heart-healthy omega-3 fatty acids.",
        "Practice good dental hygiene by brushing and flossing daily.",
        "Choose lean protein sources like chicken, fish, and legumes.",
        "Spend time in nature to improve your mood and lower stress.",
        "Avoid smoking and limit alcohol consumption to protect your health.",
        "Take regular breaks from screens to protect your eyesight.",
        "Make time for hobbies and activities you enjoy to boost your mental health.",
        "Start your day with a healthy breakfast to kickstart your metabolism.",
        "Keep a gratitude journal to focus on the positive aspects of life.",
        "Stretch regularly to improve flexibility and decrease muscle tension.",
        "Use a reusable water bottle to stay hydrated and reduce plastic waste.",
        "Plan meals ahead to ensure you eat healthy and balanced meals.",
        "Reduce caffeine intake in the afternoon to improve sleep quality.",
        "Keep healthy snacks like fruits and nuts handy to avoid unhealthy choices.",
        "Wear appropriate footwear for your activities to prevent injuries.",
        "Clean and disinfect frequently touched surfaces regularly to prevent illness.",
        "Learn basic first aid to respond effectively in emergencies.",
        "Limit your intake of red meat to reduce the risk of heart disease.",
        "Use the stairs instead of the elevator to increase daily exercise.",
        "Practice deep breathing exercises to help manage anxiety.",
        "Replace sugary drinks with water or herbal teas.",
        "Schedule regular health check-ups with your doctor.",
        "Listen to music to uplift your mood and boost brain health.",
        "Plan a regular sleep schedule and stick to it—even on weekends.",
        "Use an air purifier at home to reduce airborne allergens.",
        "Always read food labels to make informed dietary choices.",
        "Engage in weight-bearing exercises to strengthen bones.",
        "Balance your meal portions to manage weight effectively.",
        "Avoid late-night eating to better regulate your metabolism.",
        "Keep your workspace ergonomic to avoid posture-related injuries.",
        "Stay connected with friends and family to support your mental health.",
        "Keep indoor plants to improve air quality and mood.",
        "Protect your hearing by limiting exposure to loud noises.",
        "Explore new activities to keep your brain engaged and learning.",
        "Cook at home more often to control the quality of your meals.",
        "Take steps to manage stress before it affects your health.",
        "Incorporate beans and legumes into your diet for plant-based protein.",
        "Smile more—smiling can actually make you feel happier.",
        "Avoid all-nighters; regular sleep is crucial for memory and learning.",
        "Treat yourself to a massage to relieve stress and muscle tension.",
        "Opt for smaller plates to help control portion sizes.",
        "Replace elevator rides with stair climbing a few times a week.",
        "Try new fruits and vegetables to vary your nutrient intake.",
        "Use a stand-up desk to reduce the risks associated with prolonged sitting.",
        "Learn a new skill or hobby to keep your mind sharp.",
        "Organize your living space to reduce stress and improve mental clarity.",
        "Drink green tea for its antioxidants and health benefits.",
        "Plan “unplugged” times to disconnect from digital devices.",
        "Focus on positive affirmations to boost self-esteem and mental outlook."
      ];
      

    useEffect(() => {
        if (trigger) {
            const randomTip = tips[Math.floor(Math.random() * tips.length)];
            setTip(randomTip);
            setModalVisible(true);
        }
    }, [trigger]);
    const handleClose = () => {
        setModalVisible(false);
        props.onClose();  // Aceasta ar trebui să fie o prop în AppTip, folosită pentru a comunica înapoi
      };
    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>{tip}</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonClose]}
                        onPress={() => handleClose()}
                    >
                        <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        backgroundColor: '#2196F3',
    },
    buttonClose: {
        backgroundColor: '#1A5D1A',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center'
    }
});

export default AppTip;
