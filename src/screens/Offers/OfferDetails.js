import React, { useContext, useState } from 'react';
import {
    View,
    I18nManager,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    TextInput,
    FlatList,
    ImageBackground
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons'
import { List } from 'react-native-paper';
import images from '../../constants/images';
import TabOfferScreen from '../Flash/TabOfferScreen'
import VegUrbanCommonToolBar from '../../utils/VegUrbanCommonToolBar';
import GlobalStyle from '../../styles/GlobalStyle';
import themeContext from '../../constants/themeContext';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { COLORS } from '../../constants/Colors'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { FONTS } from '../../constants/Fonts';
import { SwiperFlatList } from 'react-native-swiper-flatlist';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { icons, SIZES } from '../../constants';
import ToolBarIcon from '../../utils/ToolBarIcon';
import VegUrbanCommonBtn from '../../utils/VegUrbanCommonBtn';

const OfferDetails = ({ navigation }) => {
    const theme = useContext(themeContext);
    const [show, setShow] = useState(false);
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const [favorite, setFavorite] = useState(false);
    const textData = [
        { id: '1', text: 'Flat 240% off' },
        { id: '2', text: 'Flat 50% off' },
        { id: '3', text: 'Flat 60% off' },
        { id: '4', text: 'Flat 80% off' },
    ];

    const [activeSection, setActiveSection] = useState(null);
    const sections = [
        { title: 'Salad', data: ['Salad 1', 'Salad 2', 'Salad 3'], length: 5 },
        { title: 'Recommended', data: ['Recommended 1', 'Recommended 2', 'Recommended 3'], length: 6 },
        { title: 'Rice', data: ['Rice 1', 'Rice 2', 'Rice 3'], length: 2 },
    ];
    const [selectedOption, setSelectedOption] = useState(''); // State to track the selected option

    // Sample data for recommended dishes
    const recommendedDishes = [
        { id: '1', name: 'Dish 1', quantity: 2 },
        { id: '2', name: 'Dish 2', quantity: 3 },
        { id: '3', name: 'Dish 3', quantity: 1 },
        // Add more recommended dishes as needed
    ];

    const renderAccordion = () => {
        return sections.map((section, index) => (
            <View key={index} style={{
                marginBottom: 10,
                marginTop: 8,
                backgroundColor: COLORS?.white
            }}>
                <TouchableOpacity
                    style={{
                        padding: 15,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        backgroundColor: activeSection === index ? COLORS?.bg_gray : theme?.colors?.bg
                    }}
                    onPress={() => setActiveSection(activeSection === index ? null : index)}
                >
                    <Text style={{
                        fontSize: 18,
                        color: COLORS?.black,
                        fontFamily: FONTS?.bold
                    }}>{section.title} ({section.length})</Text>
                </TouchableOpacity>

                {activeSection === index && (
                    <FlatList
                        data={section.data}
                        renderItem={renderRecommendedDishes}
                        keyExtractor={(item) => item.id}
                    />
                )}
            </View>
        ));
    };



    const renderRecommendedDishes = ({ item }) => (
        <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical: 10
        }}>
            <View style={{
                flex: 1,
                marginTop: 10,
                marginLeft: 10
            }}>
                <Text style={{
                    fontSize: 18,
                    fontFamily: FONTS?.bold,
                    color: COLORS?.black
                }}>{item.name}</Text>
                <Text style={{
                    fontSize: 13,
                    fontFamily: FONTS?.regular,
                    color: COLORS?.black
                }}>Quantity: {item.quantity}</Text>
                <Text style={{
                    fontSize: 15,
                    fontFamily: FONTS?.regular,
                    color: COLORS?.black
                }}>₹100</Text>
            </View>
            <View style={{
                alinItem: 'center',
                justifyContent: 'center',
                // flex:1
            }}>
                <Image
                    source={{
                        uri: 'https://www.london-unattached.com/wp-content/uploads/2015/06/The-Trading-House-City-Bank-London-Launch-Party-1032.jpg'
                    }}
                    style={[styles.restaurantImage, {
                        width: 150,
                        height: 130,

                    }]} />
                <TouchableOpacity
                    onPress={() => {
                        navigation.navigate('CartDetails')
                    }}
                    style={{
                        borderRadius: 10,
                        // borderWidth: 0.2,
                        justifyContent: 'center',
                        elevation: 3,
                        marginTop: -15,
                        backgroundColor: COLORS?.white,
                        width: '70%',
                        alignSelf: 'center'
                        // flex: 1
                    }}>
                    <Text style={{
                        fontSize: 20,
                        fontFamily: FONTS?.bold,
                        color: COLORS?.black,
                        textAlign: 'center'
                    }}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <SafeAreaView
            style={[
                GlobalStyle.mainContainerBgColor,
                {
                    backgroundColor: theme?.colors?.bg_color_onBoard,
                },
            ]}>


            <ScrollView
                style={styles.container}
            >

                <ImageBackground
                    source={{
                        uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxMTEhUTEhMRFhUVFxcXFRcXFR0XFRgYFxcXGBUYGBYYHyggGh4lHhcXITEhJykrLi4uFx8zODMtNygtLisBCgoKDg0OGxAQGy0lHyUtLS0tLy0uLS0tLy0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIALsBDQMBIgACEQEDEQH/xAAcAAEAAQUBAQAAAAAAAAAAAAAABgECBAUHAwj/xABFEAABAwIDAwYKCQMEAgMBAAABAAIRAyEEEjEFQVEGEyJhcZIUMlJTgZGhwdHSBxYjM0Jyk7GyF1RiFXPw8UPhY4KzJf/EABoBAAIDAQEAAAAAAAAAAAAAAAADAQIEBQb/xAA3EQABAwEEBggFBQEBAQAAAAABAAIRAwQhMaESE0FRUtEUYXGBkbHh8BUiYsHxBTIzNEKSonL/2gAMAwEAAhEDEQA/AOXoiLnrtIiIhCIiIQiIiEIiIhCIiIQiSpN9H+DZUxDuca12WmXNDhInM0TB3wT61O8Y2jT1oNP5abTucdP/AK+3hJXPtFvFKrqg0kqwF0rj0pK65Uq4YT9jSsXj7tv4AJjjM29KvaKBDvsWdENdApNk5hIi2u5L+JOidUfEb481Hy71yCUlddFSgfFosOkdBl5LBN/zj28FdXFBjoNBm+4ptIkBpj1O9h6pj4k6Y1RntCmBvXIJSV2D7CPuqOseKw3LM4uNZ07V5CtQ8yzRx8RkdENOug8ca9akfqLjhSPiFB0d65Ii7K3Z9CowTQpZXjTI3Q9Y/cLjlRsEjgSPUn2O2C0aQ0YLY69/JS4QrURFtVUREQhEREIRERCEREQhEREIRERCEREQhEREIRERCEREQhEREIW25ObZOFqmplzgtLXNmLEgyDGshSf+oTP7d36g+VQJFlrWKhWdpPbJ7T9ipDiFPf6gs/t3fqD5U/qCz+3d+oPlUCRK+GWXhzPNW03b1Pf6hM/t3fqD5VX+oTP7d36g+VQFEfDLLw5nmo03Kff1BZ/bu74+VU/qCz+3d3x8qgSKfhll4czzRpu3qd1PpCEHLQM7pqWnrhqgpM3Op1VET6FmpUJ1Yicbz9yoJJxRERPUIiIhCIiIQiIiEIiIhCIiIQqq0lCtzyd2AMS17jULMjgPFmbTOoVXvbTbpONygAuMBabMmZS88hW+fd3B8yfUZvn3fpj5kjptn4snclfU1eHMc1EMyZlL/qK3z7v0x8yqeQrfPu7g+ZHTbPxZO5I1NXhzHNQ/MmZTD6it8+79MfMqHkK3z7v0x8yOm2fiydyRqavDmOaiGZUzKYHkK3z7v0x8yfUZvn3fpD5kdNs/Fk7kjU1eHMc1EMypmUx+orfPu/THzKn1FHn3fpj5kdNs/Fk7kjU1eHMc1EMypmUwPIVvn3dwfMq/UZvnz3B8yOm2fiydyRqanDmOah+ZMyl/1Fb593cHzJ9RW+fd3B8yOm2fiydyRqavDmOaiGZMyl/1Fb5936Y+ZDyFb589wfMjptn4snckamrw5jmohmTMpf8AUVvn3fpj5lX6it8+79MfMjptn4snckamrw5jmodmVcymB5Ct8+79MfMsTE8k2N/857gHvUi10CYDsnclBpVBiMxzUazJmW2qbEpgiKryN5yAeq91taHI2m9uZuIcR/t+zxld9opMEuMdx5KGse4wBmOaimZMyrSqYc1C11Sq2noKmQE66lmaQPapNhOStCoJp4sOB0ho/YuVqtRlKNOR3HkqUyan7L+8KMZkzKYfUVvn3fpj5lT6it8+79MfMk9Ns/Fk7km6mrw5jmohmTMpf9RW+fd3B8yHkK3z7u4PmR02z8WTuSNTV4cxzUQzJKl/1Fb5936Y+ZXDkM3z7u4PmR02z8WR5I1NXdmOah0qqt3q9aVQFWuUy+jz7ut+cfxChjlM/o8+7rfnH8Qstv8A67u7zTKH8gUsJSLqqqvProKitKuRClAqqPV6FNuLfAEjDmtvnOHmHT7tFrHbRqZsPU5wZqlCmSSxsw+rSDhMaXPr6lqZZdONE47wd07JWd1fRmfexTNyNUYO1n5mtGIaaedw5/K2COZc47svRcBcW4rwGNeagqBzS7mnsa/LY0xXa01sukAX6+xSLG+MfP7x4YjcjXtUuVse9YOxsQ97XF+UgOIaQWkwNQ7JaQbLYLO9hY4tOxOa4OEhWq9CVSVRSrSVfTpSbRG8mwHaUAmwWo21j6tN3RIZSazM55oGo2S4gklrwRAgm2iZSZpmPfvuKq92iJW/Y2kPGdUP5WgD0ZjJ9QSphAQXU3ZwBLgRle0byWyQR1gnrhRR+3KuYuAplnhXg4bBzHo2dmmNerT1rbbP2m9pa5zgxwdYkZCfJGVxm9/QOtO1Zi8Dux9j3CVpibie/D2VmBF748NDiWiAQ1wHDM0Oj0Ex6FG8XykZRL2VQ4uZGXKPGBEgmbA7iltoPc4taJI9ymaxoAJulZe0Mc5rixjXOcBMNEwOJi41W+2LyZYHudiSyo5oENIhgngPxdvs4Rz6OMa6vicRUcIAaCYvZxMCCRMZdZ9a6UMPTdMuuLRlLZ9JGnYUy02a0U4YxsyL4Ik9UXG47sVhfXDiZnw97FgUK9FxdTptpZgIyxAB3COB1UN2nybe9734WsKMxzlKJME/aFpNh0ZIsbjct7yi2vg8M1zmtyVmgAObh38R/wCUNgiDxhaAcoHGmytUaWOeSA6dQQCc28Ag8PaEizWa0NcX023YXxj2HEdt4zTBq3NxjxnLYfcrl/KjYjsJiHUSZbqx3lMMwT16g9i1+Exj6RlhjiNxU25f4l9Wm11RmUtMNlzbSOABLpG8uGnihQTJ1j1r1lmc59FusgmL9xPvNcio2HnQ7lLtk7ebUs4lru3/AJK32GxDmmWu94K5mQd3outvsjbrmQ2oZbx3jtWa0WGRLPBaKVqgw/xXVMFjg+xgO9h7FtMFhM8m9vJE/uolsF4qOBBBbEjeOpSMFcB7W06l4u3LrtLnsuKbaBoZQ1uYlwBDiGxJIsfQvPC1czWu0zBp7JAMe1ekqrSl1HNIuEK7A4G8yuO7z2lXhWbz2lXr1LsVy2YK1ymf0efd1fzj+IUMcpn9Hn3db84/iFjt39c93mnUP5QpaFUlFRzgNV59dBWjqWj5WY+pSbTyONNjnRUqNbmLRaIHXf1KTYbA1qjQ5lJ7muJDSN5EyPYVrtubLxofSFJhDiXTSeAG1RE2ceAB371rs9JwqBzm3dcxhdfEY4TdKz1ajSwgOv6sfMd8GYwWjwWMqZqrqdZuJp5JDbNrNdOkEeLrcleOExebC5sQypVyOYWuYQ4vcHSGjJ5JF1t8DsWs/FPPNBjmtc0sZBJ0Bc7hFt+4LBwXJPaPg4oDDugObUBa8DnmGczZFwJymTx6lubTDpgbW9u2bxAJF0xvvgi7M58YnYftFxk+M4da9P8AVKL6obWpvpvotNVubxYLOnYawHEabjwVztt56ZIo1mh1Ko5lSBADWyCeE2I1WEOT9QVw11DmWmg6nzU84Q9znRb8Ukg750W2qbMx7KDmVsO1rRTexzxa+SKdohsyNYhJfRYf2gmOs/LjMQTtxBJx65TG1HT8xic8N8eMBa/ZW2SKNBsGtVqZzAMEAOddxOgFgpE023T61Hdlcl8cxtCrQpOe8Nc2pTluV7M5cCHT/m31jrBlp2ZiBrQqNIbmIIEgX1g9R9Sra7OdLSptuJO/f4ARhCtQrACHm8R5c5ncsVytAWXidn1aYmpSe0HeRb17ljR2LA5rmmHCD1rUHAiQZXrSb0XngAPWR7p9aVuTNKuWtNSuH16OYtafsi0EkNdvDi1rwSI1g8V6YIg5mEgZ2wCbAOBDmydwkRO7MvUNrt+yJqMFxBzQJOYxAJgkTAsVrszmshxaTsu7b92zDrGCz1gXS0GO3s+yxvqlhRUc4PqxTq845vPUhTFQHICRPQNph0XHoWNitnNe43cA15vIMgkQ0kWMhrdOGu9bbEUsmZz3PJfGYeIHdKZId0ze/ijtWE5znEADsa0WHGB71e0VrxAg9Rv8fyZntVaNO43yMvfh5he2CwD8RUyMid5OjWiBf2BZuM+jDDvJqVTUqPIAIDsjRGgGX3yvTZ2KGFLmGRVqAGzSQGAWOYCNSZvuTH8qarX0mCoGmrmyk+KQ2bkQdYsJRZ3UqYh2lpHaNg8RhCXWFao75I0fNYWD5OMwDnnDMLS4NDg8lzXDpRc8NfSFibS2u8SQ2rSflf8Ad1crS4gw6XAhpmLkQDfitq3ldWawOrYc1WmxyNOcHo2LbtmcwNx4u+V5Yyphq7HDpMeSIa9pa640vY79OtTUdUY7TDtIbjiNqKZAuqN7x781FdvhzGPdVy1A+nSa2pUqmoJmlIdYNN75gDPUvLlLWAp0qZJBDecdFQM8dhaOkdxYKfbJA1V+2NlvLHUQTzZMwLgEaEDco9tPFl2KyOEGqS0Wb0WOJZSEnxobGuh0Wmy1G1BpTfM92PdG2LrutXqM0QIw9IAXly2xGcFsn7yOoBhe34LW4jkbi6VI1X0X821uZzmkODbaOymxFpHC+l11Tk7yZZSd4Wc9WsWy1haQWFwggsYXDNd1yTxAESpdUquJLLtlkVHkAADcL6mDbsPFNZbW0wKbQT2b+o++eJwl2l79F8vmmI3rwdT0XfeWvJqhjg11OWVGWa4AZHiRLXAcLwe1ci5WbF8EfTpGoypUyZq2QSxjiSAwO/EQBewglbqNpZVuaUp7GwDtWb9H20jTqmg49GpdvU8bvSJ9IC6QFwsPLXBzbEGR2i669sbanOUmu1kAzvg8evcuX+q2f5hVG3HtW2w1hBp7sFtnFUGqNcDdXNXFOC6IxXHd57Sr1ZvPaVevWuxXKZgrXKZ/R393W/3B/EKGOUz+jv7ut/uD+IWK3/1z3eYTKH8oUtJWNindFZK8sQ2RC4TcV0HC5STY9Zo2ZTzV3UPtnTVaCS3pPjS99PStphqhLsEGVTiKfOVC6s49KRTqgWOkSRPUNdVFNnbdazDtw9TDCqwPc4y+M0zAjKdCQddyuxXKJ/2Yw9FlBtJwdlBLgYkw6wt0nTxzFd9lrpNaJOAG+bo7vv1rjus9RxN207ovz+3Utvycd/8A2MSDwq//AKMWZtWi99PC83iqeHIpkSXxmtSgCDc74Wkp8sw41alHD0m1XgNNQODiDGtmAusREncNVrNq4s1mUWOtzTcjQTM9ETFuDZ3qH2qlTaWzJknaMTONxCltnqPeHRGA2HAeCm7cQzwpxyZqlDDN5t3R+0L80ubBj8Ecek4QtByYxO0KhfWa5lZtQuY5lV0NzZRfKBYARYRIt2a1u330qlKpTa1hp03NcC4lr2SC4unTpS6Z1d664PlY1pqvoYWnSqVZIqHRreiDkaWjVxBvAJIsVbpTHkO0iAJN3Xtwv3X9uCr0dzRo6IJMY/m7flit/iKfNYegyrXdhoLwX05IB/ExuUzlmTPUmxKoLsUG4p+IbzDenUzAtP20tAd2NPpWiobfDqdOlWoNrNpTEv1Oji7omTObfqepezdtMAeKGHFHnGZHZXzOsG7es2VRa6TSDNw/+pw/5yVjZ6hBEY9kYz2rcMDqOEr85iW4vMA0ZXBwZMgmSZiTu4dqjKbLrCkKjcgdnbE5iC2QRI3cPUgK5drrCrokbBheczet9mpGnpTtPZkLkJXozFvAy53hvAOIHqleZW8GwTzQqFjnBwu3NGWfKET7Umkyo6SybsY3JtWoxkaW1aMEcR/zis3ZO0n0HF7QCCLh1gexwEg3VlLZWGeYNKLhzixxvl/DlEi8xb3Ssd1BzKb3NDA7MSYsWt3NN7HXdayhjmAh1NxB2XbZ/KRWtFP9j9u/D317FN6ePweI8cMB0LakDSAbEw7tWv27sbB16YYalABs5btIb2GZHZKgrjVrio/wiqGNblcWUmG1ic1g4tiDoI3rVYqtSbTysDarurDix4zHWuww06oh8A7TouBntbtVaVheDLXGBGEkYTwmO+FMNsbMc1jDRLqhaMs5jlM2ILZ3DQ3USbgC5j6N3kPzOphzSOPRJvFiYbwK0dTbdZri6kzE0yW5YDSGkRBls5eO5YFDaOJpHMzNJEdODbeBadJ0vdVbY3CYcDz999+Kc7Spt3js88Fv9m7Yr4Vzadc56Lp5txnMACQQSd4Wbt3YwxZp808NcTma+JgRe1uAPoWlr1K1fDDnabW5XBzCXEvOa2/tm6lPIqrToZXVKnTFojotG+51df0JbmQ8VGkBwJBi8Hr3faVnkaBBvBHvrWsrbO2o0ONIVmsaYkuytMX6IfBLf8gI61HKHLjGAn7d3S8aQ0zHEkLstTbLCw1OmaYBzuy7piZ3jqC+esVgiyo9oHiuMAggx+G0zpC30GUqkyBd1LO+vVJ+YKS4nljiXwX13SBANmkTrERCjmPqGo7NIPpWPWpGxIAB04W/de2H2a99mMcZjpR+wFytNOlTp3hJq1XvGgBcsWo0gzGkdim/IXFZqJZvY4j0G4/c+pR1uEdSBkmdYdB3xOp9qz+SuJjEkWh7b7rg2/cpVripRcBsv8EUAadVpO1dGwT7ELKC12GfBWxavL1BtXcYVx3ee0q9Wbz2lXr1TsVy2YK1ymX0e/d1f9wfxChrlM/o8+7rfnH8Qsdu/rnu802h/KFLSqlCUXn10FbSZJAAFzCuxWGjouAIIBjUEHTtWfgcIMpquu0AyBrJJAb6YN91+Cw8RVLjJ/8AQ6k0s0WgnE4dm9UDpcQMAtTh8LUuXEMJLndEyTMwDYRADBv8TrV9TZ0mS906A6ECADBGkwDI/Ywttg6IfUYwmA5zWk8MxA96t5E7Vp4vE1aD8KyGMqPhj6vPUzTqBgp1w6G53SSMseKbb1ts1GvaJcwgAXe7ifFZq1WlRhrgT77Qtf4DZ8vJL25ZN8uug01M+gbgAvLG4Jz4hwJmbkiIBLQMo8qCewcIXRf9Kw/9pW9buv8AyVx2Ph5jwWt42WcxjWM059N6eP0+0AzpNz3RuSTbaMRB9965tR2S0BoJcYDZGbonLBi94zAH18YWyjgs3bOEbRrPptMhptxuAYPZMLCXLrF+kWvN4JW+kG6ILcCqleYV8qJbY26/nX0vEAJbIPtNlez2d1ZxDdiirUFMSVJcRtSjSM1HtABBIkcbj/0t9sDl1hsTmbTe7eHHKQL23xx3SuM09kMc8OdUc4//ACNzMv8AlIPHctowVWdJuQ5JLcnRAHAA+266zLI2iPkdfvwHvvXPqPdWPzNgePp5rrXgzqUGzm/hcPxR+xWJidrU2n7SQLeMJbN5Pb1laZu0BSdLK7GsPSDZDhfS34exZGI5XYU0y2r4KX7jnDW+ka+1crUh52iNkHIwfJNw/dfPd581TC7OoOzc3VZlqB2YjxszgW2vAEH9+qI6dl1m1hQ5wVOkA1zd+azQZJv12Xm/EYAkl3MtcTJNGs5nZ224rZYPa9KixzqNRrzeHurMD2yCCcxcbwSJMxKdRYWk6UkdY3dfMBOs7xQJLDF2E3dRPYsTG0sO1lRpNZ1ZpLBJ6MgwagygW1IB6tVrqWJw9EZnNpyLh1Qy4HqnT0Ba/aG0cNEvcxxO4V31Se0Uy1o9KwKXKOhT+7wlOReSLz2kkxbSVsbZ6j24HIff7KK9sBuc6e0z5XLd4x9XGua2iCykDmdUqdFpPHiQL9s9S2+F2XSpgGa1ZwiziKbTxjMJiLhQjF8rcS4dHKzgdco4NFmjtieta2hj8ZUJyVKp45TH7Qm9CqlkSGtHX5nasfSWh2BJK7g6vhzSLclYl7crqfODLB/yHuErQbT2DRqkZ6DWho8fnHyG69KCBA65i65th8djAS013iBoXZpHUYIXtiNqV3M5vnnkOuRNjHEAAHsKr0KsCIeB2e/fWoFZm1p7/wArx2nVpCq40gMjj9mXEvIaLA9LSdeqV7s269jSGwDuP4jfeQPZotdQwOcAuMD16nUD3rMOEyhpymN3GF0HimQGm9Lph95Fy8KuKJb0jJItOoHCdyy+SGHc7Eh25gjvSB7z6Fr3UTJytkmwHWbKc8ndmii1o1cSC48TZKtVVtOkQMSpp0y+oOpSGnhuv2LMAuqlVC8u5xIXaAhcd3ntKvVm89pV69W7FcpmCtcpn9Hn3db84/iFDHKZ/R2fs635x/ELHbv657vMJlD+QKVVXgCSQB1mEdUAEkgDj+ytrUgTmvIBAgxqQTf0BY+GriLBxmCCJcN+hPr/AOlxG05bI71vLoK22E2iGtBY0ZgLPMyASSIbuMzc8NyxqjpJJNzc9p1KwqdOmLBjhcAWjdAOvastrQBAsApqE3CTGzD7KGATPisjBYc1HhjSJMwSbWBPuW2z4pjS7n4ADSenB6RyjpOF+2VH6tEO3uG6xIVPBx5T+PjK1Ko1g2z1Ej8wqvYXHZHWAfNSQYjFESMTaGnUg9K4EFvYqUK2Le0Hn3Xn8XAgeMBH4tQdx3qNHCg/iqd5PBR5T+8m9JG93/TuaVqD1f8ALVs8fg3U+k9wMucJvMiCTJ1117VhuXjzImZdrOsf99i95WWoWky1aGhwHzIFE9ubDqOqvqNaHBxmxEiwmQfcpZKsdUATLPXfRdpNValMPEFc3xOGc09Jr2xvLSL7onrHtVjKztAT6+O8Lo78U3itVj6mHPjMpk8Yg+hwuF1Kf6lpXOp+B581kdZoMhyg1V5IhwzDrHtHBWVqIiMrSAN4lbzFYbDE2L29jpHtWurUmgGKgPaIPZvXQZaGO3juKzOpu3rWjD0zuc09WmnBez8GzKcpB68rZ4ndr6V5mq0WJEda92gESIjq09icTPYktAw2r08BblHQmRYtyl3p1I14rCqYQ5g2lTbPF7mjtkOd2X0WwAIjtCxtsVnBhIcelDZ1twk3CoJJhMd+2dyxalOlT+9eKtTyWHoDqLhY+hWYnbD3wJhvktsNN8Xd6VqwBvVC8bh6U0Uhtv8AezcsxqmLrve3etlQJfpPuG/3LcYXAtsC4Zt3kj/nvUeoYogLNpbRMzBOns0VKjHnBOoVmAy4StrTplpJJFgYaf8AKI9XuWa1rQLkfiDfWD7z6lqKddzyC62nbZbbC4lohrACfxONz6OHoWOpIWvWhwuuWds/Y4Dg9w7BGnWpJgaImeH7rW7PxLohxnt1W6wpsuPaajyfmWqk0XLIBVQqK4LEVpXHN57Sr1ZvPaf3V69a7FclmCo5TH6P/u6v5x/FQ4q5lRw8Vzh2Ej9kmvS1tMsmFZjtB0rryOXIfCKnnKnePxTwip5dTvH4rn/Cvr/8+q0dLPDn6LreXqKvhch8IqeXU7x+KeEVPLqd4/FT8K+vL1UdKPDn6LrrlbfgVyTwip5dTvH4p4RU85U7x+KPhX15eqOlHhz9F11oVHBcj8IqeXU7x+KeEVPLqd4/FHwv68vVT0s8Ofoutv6leAuQ+EVPOVO8finhFTy6nePxR8L+vL1UdKPDn6LrzliYlpItK5Z4RU8up3j8U5+p5dTvH4qR+lx/vL1QbVP+c/RT7EYV5mJWuxOy3niolz9Ty394/FOff5b+8fintsjm4Oy9Uo1Af85+i3tTYD/8l5v5Pv61peff5b+8finPv8t/ePxThTqcWXql/Lw5+i2VXk087ivEcm3i4Dh7Fh88/wAt/ePxTnX+W/vFMAqj/eXqqFjDfo+/BZrtn12XzOte9/3XpV2bUqtEgRMyBE9u5aw1HeU71lBUcNHO9ZUw/eJ7PVGiBvjtXri9lNYYfObgNfTwXgzZgd4oPpQzvJ9aqJ4n1qwL4xVDSBOCy/8AR8pEtkb1JcByeY9oc0WP/LqIF7vKd6yqtqvGjnjscR70mpTe8fvju9UymGs2SprjdhNbTMamAPXf2SvTZewgBooMaj/Kf3irhXf5b+8fikmy1C2NZl6pum3SnR9+C6dS2eBuKzmU4XI/CKnl1O8finhFTy6nePxWc/phOL8vVNFpj/OfouuuCtE8FyTwip5dTvH4oMRU85U7x+Kr8L+vL1VulfTn6LzIue0q8K0BXLqkysrRciqqIoVkhIREIhISERCISEhEQiEhIREIhISERCISEhEQiEhIREIhISERCISEhEQiEhIREIhISERCISEhEQiEhIREIhISERCISEhEQiFVUREIRERCEREQhEREIRERCERF1fk3U2eMHTa7D4B+anTNepUaHOY+Bn5x5dLTOg6Mdauxmkl1KmgJhcoRbug0eF1eYo061MGrlpu6TDTBOWDMmOiQQZMdq3mIo4mGu/02gxrHmo8tNMNcTScCZLiLA5xqAWjhCkMlBqR+QoQinDMPVc0xsvDlwc9rj9mGgtMQGkzYh15jo2tmm9tKqSCzZmEJa9zbOGtJ1RhgugRLTa5imTwInV9arrurMKCKhIGpC2tfk7iqbHPfRcGsHSJc214kgOnXq48Cpb9GNCm6HVn1AynWe5zGVMmc83T5sVLjMyQ7o7yeGZVayTBVn1Q1si9QGpTc2MzXCQHCQRLTo4TqDxVimnLrar8Tj6LuZpsPRy0iWkSarmjO5tiXNZTnURpxOb4BiS1wdgcJUzF85XhrnPkAPGbdOW2++kq2rvVdbAEjHrXPkW32lybxFCnzlRjcgIBcHA3Pi21v/wBwtO/Q9iWQRcU0ODsEBGkhVJXTdnbTxTMSKFRmHfs8VmgCpSpOp06DXG7I/wADqZKiGyg52Lq+CtpGTW5sPHQyZiRlaRrlgAEb4TDThLbVmeycVoJHEKsqe4huOcWO8Gwrb5A7O0gmu9oF85iTa3ldkeWGo4utlrsweCiq0ZRlb43SeyrBd40OiSd4kWsav3CjXdniFB0Ug5V899ka1DD0j02t5oNkwKbjmLSZ8cEfndxKj6W4QYTWukSiIihSiIiEIiIhCIiIQiIiEIiIhCIiIQiIiEIqKqIUq5jyDIJB4gwb2Oi9qmMqOAa6pUIEwC4kCTLrTvKx0QohevPu8p2s+Mdd57etUFZ3lO1J1Op1PavNEIXs7EPIDS95AEAFxIAsYjhYeoLxLQiIQBCAL0NV2uZ3rPavNEIKuLjxP/WitREIVIHAKqIhSqq5jyNCRIgwYkHUHqufWrEQoSUREIRERCEREQhEREIRERCF/9k='
                    }}
                    // resizeMode={'stretch'}
                    style={[styles.sliderImage]}
                >
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alinItem: 'center',
                            marginTop: 15
                        }}>
                        <ToolBarIcon
                            title={Ionicons}
                            iconName={'chevron-back'}
                            icSize={25}
                            icColor={theme?.colors?.white}
                            style={{
                                backgroundColor: theme?.colors?.bg_color_onBoard,
                                marginEnd: 10,
                                borderRadius: 50,
                                width: 50,
                                height: 50
                            }}
                            onPress={() => {
                                navigation.goBack();
                            }}
                        />
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly'
                        }}>

                            <ToolBarIcon
                                title={AntDesign}
                                iconName={'search1'}
                                icSize={25}
                                icColor={theme?.colors?.white}
                                style={{
                                    backgroundColor: theme?.colors?.bg_color_onBoard,
                                    marginEnd: 10,
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                            <ToolBarIcon
                                title={AntDesign}
                                iconName={'sharealt'}
                                icSize={25}
                                icColor={theme?.colors?.white}
                                style={{
                                    backgroundColor: theme?.colors?.bg_color_onBoard,
                                    marginEnd: 10,
                                    borderRadius: 50,
                                    width: 50,
                                    height: 50
                                }}
                                onPress={() => {
                                    navigation.goBack();
                                }}
                            />
                        </View>

                    </View>
                </ImageBackground>
                <View style={styles.header}>

                    <View style={styles.headerInfo}>
                        <View style={{

                        }}>

                            <Text
                                numberOfLines={2}
                                style={styles.restaurantName}>
                                Sate Kambing Pak Slamet
                            </Text>

                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                alinItem: 'center',
                                marginVertical: 8

                            }}
                        >
                            <Ionicons
                                name='location-sharp'
                                color={theme?.colors?.colorPrimary}
                                size={20}
                            />
                            <Text
                                style={{
                                    fontSize: 15,
                                    color: theme?.colors?.textColor,
                                    fontFamily: FONTS?.regular,
                                    marginLeft: 5
                                }}
                            >
                                Dewas mp plot no 3
                            </Text>
                        </View>

                    </View>
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 10
                    }}>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 10
                                // justifyContent: 'center'
                            }}>
                                <AntDesign
                                    name="star"
                                    size={15}
                                    color={'orange'}
                                />
                                <Text style={styles.rating}>4.5</Text>
                            </View>
                            <Text style={styles.rating2}>200+ ratings</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <AntDesign
                                    name="clockcircle"
                                    color={COLORS?.light_green}
                                    size={20}
                                />
                                <Text style={styles.rating}>10-20 min</Text>
                            </View>
                            <Text style={styles.rating2}>Delivery Time</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <MaterialCommunityIcons
                                    name="motorbike"
                                    color={theme?.colors?.colorPrimary}
                                    size={20}
                                />
                                <Text style={styles.rating}>Rp 10.000</Text>
                            </View>
                            <Text style={styles.rating2}>Delivery Free</Text>
                        </View>
                    </View>

                </View>

                <View style={{
                    flex: 1,
                    borderWidth: 1,
                    borderColor: theme?.colors?.colorPrimary,
                    marginHorizontal: 15,
                    marginVertical: 7,
                    backgroundColor: '#FFF4F0',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alinItem: 'center',
                    marginTop: 20,
                    padding: 10,
                    borderRadius: 30,
                    paddingHorizontal: 10,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alinItem: 'center',
                        justifyContent: 'center',
                        marginLeft: 9
                    }}>
                        <View style={{
                        }}>
                            <Image
                                source={images?.promo}
                                // source={{
                                //     uri: 'https://cdn-icons-png.flaticon.com/128/7130/7130017.png'
                                // }}
                                style={{
                                    width: 40,
                                    height: 40,
                                    borderRadius: 50

                                }}
                            />

                        </View>
                        <Text style={{
                            fontSize: 15,
                            color: COLORS?.black,
                            fontFamily: FONTS.semi_old,
                            marginTop: 12,
                            marginLeft: 15
                        }}>You have available Promo</Text>
                    </View>
                    <MaterialIcons
                        name='keyboard-arrow-right'
                        color={theme?.colors?.white}
                        style={{
                            marginTop: 12

                        }}
                        size={30}
                    />
                </View>

                <View
                    style={[
                        GlobalStyle.flexRowAlignCenter,
                        {
                            marginTop: 10,
                            alignItems: 'center',
                        },
                    ]}>
                    <Text
                        style={[
                            GlobalStyle.headingText,
                            {
                                color: theme?.colors?.white,
                                fontSize: 20,
                                fontFamily: FONTS?.bold,
                                alignItems: 'center',
                            },
                        ]}>

                        Recommended Menu

                    </Text>
                    <View
                        style={{
                            flex: 1,
                        }}
                    />
                </View>

                <TabOfferScreen />

            </ScrollView>
            <View
                style={{
                    // flex:1,
                    backgroundColor: theme?.colors?.colorPrimary,
                    marginHorizontal: 20,
                    borderRadius: 30,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // padding: 15
                    paddingVertical: 10,
                    alinItem: 'center'
                }}
            >
                <View style={{
                    marginLeft: 30
                }}>
                    <Text style={{
                        fontSize: 14,
                        color: theme?.colors?.bg_color_onBoard,
                        fontFamily: FONTS?.regular
                    }}>Total Price</Text>
                    <Text
                        style={{
                            fontSize: 17,
                            color: theme?.colors?.bg_color_onBoard,
                            fontFamily: FONTS?.bold
                        }}
                    >Rp 50.000</Text>
                </View>
                <View style={{
                    justifyContent: 'center',
                    // marginLeft:10,
                    // marginRight:0,
                    marginHorizontal: 20
                }}>
                    <VegUrbanCommonBtn
                        height={39}
                        width={140}
                        borderRadius={25}
                        textSize={12}
                        iconPosition={'left'}
                        icon={
                            <Image
                                source={{
                                    uri: 'https://cdn-icons-png.flaticon.com/128/58/58271.png'
                                }}
                                style={{
                                    width: 25,
                                    height: 25,
                                    marginRight: 10
                                }}
                            />
                            //     <Octicons
                            //     name={'arrow-right'}
                            //     size={20}
                            //     color={theme?.colors?.text}
                            //     style={{
                            //       // marginHorizontal: 20,
                            //       marginStart: 15,
                            //     }}
                            //   />
                        }
                        textColor={theme.colors?.white}
                        text={'Add to Cart'}
                        backgroundColor={theme?.colors?.bg_color_onBoard}
                        onPress={() => {
                            // navigation.navigate('Auth', {screen: 'Login'});
                            navigation.navigate('Cart');

                        }}
                        textStyle={{
                            fontFamily: FONTS?.bold,
                        }}
                    />
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS?.white,
        // padding: 10,
    },
    sliderImage: {
        width: '100%',
        height: 200,
        // overflow: 'hidden',
        // borderRadius: 20,
        // marginTop: -40
        // borderBottomEndRadius: 50,
        // borderBottomRightRadius: 50,
        // borderBottomLeftRadius: 50,
        // marginBottom: 20,
        resizeMode: 'stretch',
        paddingTop: 15

    },

    header: {
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: COLORS?.white,
        borderRadius: 20,
        padding: 10,
        // marginVertical: 20,
        marginTop: -80,
        paddingHorizontal: 8,

        // borderWidth: 1,
        elevation: 5,
        paddingVertical: 20,
        marginVertical: 6
    },
    restaurantImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
    },
    headerInfo: {
        marginLeft: 10,
    },
    paginationStyleItem: {
        height: 3,
        width: 10,
        borderRadius: 5,
        // marginBottom:20,
        marginTop: 7,
        // marginTop: -35,
    },
    paginationendStyleItem: {
        height: 5,
        width: 5,
        borderRadius: 5,
        // marginBottom:20,
        // marginTop: -35,
        marginTop: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.black,
        // paddingHorizontal: 5,
        marginHorizontal: 5,
        borderRadius: 10,
        paddingHorizontal: 20,
        marginTop: 5,
        height: 40,
        // borderWidth:0.1,
        marginBottom: 10
    },
    input: {
        flex: 1,
        fontSize: 14,
        fontFamily: 'OpenSans-Regular',
        paddingStart: 5,
        marginStart: 5,
    },
    restaurantName: {
        fontSize: 18,
        fontFamily: FONTS?.bold,
        color: COLORS?.black,
        // maxWidth: '90%',
        flex: 1
    },
    rating: {
        fontSize: 15,
        color: COLORS?.black,
        // marginVertical: 3,
        fontFamily: FONTS?.regular,
        // textAlign: 'center',
        // paddingVertical:5
        marginLeft: 5
    },
    rating2: {
        fontSize: 15,
        color: COLORS?.grey,
        // marginVertical: 3,
        fontFamily: FONTS?.regular,
        // textAlign: 'center',
        // paddingVertical:5
        marginLeft: 10,
        fontSize: 12,
        marginTop: 10
    },
    basicInfo: {
        paddingVertical: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#CCCCCC',
    },
    basicInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    menuItems: {
        paddingVertical: 10,
        // borderBottomWidth: 1,
        // borderBottomColor: '#CCCCCC',
    },
    sectionTitle: {
        fontSize: 14,
        marginBottom: 10,
        fontFamily: FONTS?.bold
    },
    menuItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#DDDDDD',
        paddingVertical: 10,
    },
    menuItemName: {
        fontSize: 16,
    },
    menuItemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    reviews: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#CCCCCC',
    },
    boxseller: {
        borderWidth: 0.2,
        width: '100%',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        // marginHorizontal:5
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default OfferDetails;
