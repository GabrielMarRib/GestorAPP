import React, { useState } from "react";
import { Text, View, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { JetBrainsMono_400Regular, JetBrainsMono_700Bold } from "@expo-google-fonts/jetbrains-mono";
import { useFonts } from "expo-font";
import { useNavigation } from '@react-navigation/native';
import { navegaTela } from '../../servicos/funcoes.js';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { db } from "../../DB/firebase.js";

const auth = initializeAuth(db, {
    persistence: getReactNativePersistence(ReactNativeAsyncStorage)
  });
/*
TELA DE CADASTRO!!!!!!!!!!!!!!!!!!!!!
*/

export default function Login() {

    const navigation = useNavigation();

    const [fontLoaded] = useFonts({
        JetBrainsMono_400Regular,
        JetBrainsMono_700Bold
    });

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    if (!fontLoaded) {
        return <ActivityIndicator />;
    }

    return (
        <View style={styles.container}>
            <LinearGradient colors={['#e04d18', '#1e1e1e']} style={styles.background}>
                <ScrollView contentContainerStyle={styles.scrollContent}>
          
                    {/* Titulo e subtitulo */}
                    <View style={styles.divTextTitle}>
                        <Text style={styles.lblGestorAPP} onPress={() => navegaTela(navigation, 'CadastroGestor')}>
                            Gestor APP
                        </Text>
                    </View>
                    
                    <View style={styles.divTextSubTitle}>
                        <Text style={styles.lblLogTech}>
                            Logística + Tecnologia
                        </Text>
                    </View>

                    {/* Div do quadrado cinza da tela */}
                    <View style={styles.form}>
                    
                        <View style={styles.cardForm}>
                            {/* Input de email */}
                            <Text style={styles.lblLogTech}>
                                Já possui uma conta? Entre preenchendo o login abaixo:
                             </Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Email"
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                            />
                            {/* Input de senha */}
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                secureTextEntry={true}
                                placeholderTextColor="#878787"
                                onChangeText={(text) => setPassword(text)}
                                value={password}
                            />
                           {/* Botão de Entrar */}
                            <View style={styles.BtnEntrarView}>
                            <TouchableOpacity onPress={() => handlelogin(email,password)} style={styles.BtnEntrar}>
                                    <Text style={styles.txtBtn}>entrar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        
                         {/* Texto */}
                        <Text style={styles.lblLogTech}>
                                Cadastre sua empresa e torne-se o gestor clicando no botão abaixo.
                        </Text>

                            {/* Botão de cadastro */}
                            <View style={[styles.BtnCadastrarView, {width:"170%"}] }>

                                <TouchableOpacity onPress={() => navegaTela(navigation,'CadastroEmpresa')} style={styles.BtnCadastrarEmpresa}>
                                    <Text style={styles.txtBtn}>Cadastrar Empresa</Text>
                                </TouchableOpacity>

                            </View>

                    </View>
                </ScrollView>
            </LinearGradient>
        </View>
    );
};

async function handlelogin(email,password) {
    try {
        const auth = getAuth();
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error.message);
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    lblGestorAPP: {
        fontFamily: 'JetBrainsMono_700Bold',
        fontSize: 35,
        color: '#fff',
        textAlign: 'center',
    },
    divTextTitle: {
        marginTop: "15%",
    },
    divTextSubTitle: {
        alignItems: "center",
        justifyContent: "center",
    },
    lblLogTech: {
        fontSize: 15,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'JetBrainsMono_400Regular',
        marginTop: 5,
    },
    form: {
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    },
    cardForm: {
        backgroundColor: 'rgba(217,217,217,0.22)',
        shadowColor: '#000',
        shadowOpacity: 3,
        shadowRadius: 10,
        width: "80%",
        padding: 18,
        borderRadius: 30,
        alignSelf: 'center',
    },
    input: {
        backgroundColor: "white",
        width: "90%",
        padding: 12,
        paddingLeft: 20,
        borderRadius: 30,
        fontFamily: "JetBrainsMono_400Regular",
        fontSize: 20,
        margin: 18,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
    },
    btn: {
        backgroundColor: "#E04D18",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        margin: 15,
        width: "55%",
        height: 40,
        verticalAlign: 'center',
    },
    txtBtn: {
        fontSize: 20,
        fontFamily: "JetBrainsMono_400Regular",
        color: "#FFFFFF",
    },
    txtEsqueceu: {
        fontFamily: "JetBrainsMono_400Regular",
        color: "#FFFFFF",
        textDecorationLine: "underline",
        marginTop: -10,
        fontSize: 12,
    },
    ViewBtnVoltar: {
        marginTop: -120,
        width: '50%',
        height: 'auto',


    },
    BtnEntrarView: {
        alignItems: "center",
    },
    BtnCadastrarView: {
        alignItems: "center",
    },
    BtnEntrar: {
        backgroundColor: "#E04D18",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: "55%",
        height: 40,
        verticalAlign: 'center',
    },
    BtnCadastrarEmpresa: {
        backgroundColor: "#E04D18",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        shadowColor: "#000",
        shadowOpacity: 10,
        shadowRadius: 4,
        elevation: 5,
        margin: 10,
        width: "45%",
        height: 40,
        verticalAlign: 'center',

    },
    
   

});
