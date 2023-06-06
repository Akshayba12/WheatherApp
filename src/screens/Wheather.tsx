import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
} from 'react-native';
import {debounce} from 'lodash';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import axiosinstance from '../util/axios';
import {useDispatch, useSelector} from 'react-redux';

const Wheather = () => {
  const [datas, setDatas] = useState([]);

  const dispatch = useDispatch();

  ///////fetching api///////////////
  const fetchData = async () => {
    const res = await axiosinstance.get(
      `http://api.weatherapi.com/v1/forecast.json?key=1e3bdb6c5faa46d9bb3110928230506&q=${search}&days=6&aqi=no&al erts=no`,
    );
    const data = res.data;
    dispatch({type: 'SUCCESS', payload: data});
  };

  const val = useSelector(state => state.DataReducer.weatherData);
  console.log('val', val);

  ////////debouncing///////////
  function debounce(cb, delay = 1000) {
    let timeOut;
    return (...args) => {
      clearTimeout(timeOut);
      timeOut = setTimeout(() => {
        cb(...args);
      }, delay);
    };
  }
  const search = useSelector(state => state.DataReducer.user);

  const getData = debounce(val => {
    dispatch({type: 'user', payload: val});
  }, 1000);

  useEffect(() => {
    fetchData();
  }, [search]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const d = new Date();
  const date = d.getDate();
  let month = months[d.getMonth()];
  let day = days[d.getDay()];

  const [expand, setExpand] = useState(false);
  const DATA = [
    {
      time: '12Am',
      deg: `${val.forecast.forecastday[0].hour[0].temp_c}`,
    },
    {
      time: '1Am',
      deg: `${val.forecast.forecastday[0].hour[1].temp_c}`,
    },
    {
      time: '2Am',
      deg: `${val.forecast.forecastday[0].hour[2].temp_c}`,
    },
    {
      time: '3Am',
      deg: `${val.forecast.forecastday[0].hour[3].temp_c}`,
    },
    {
      time: '4Am',
      deg: `${val.forecast.forecastday[0].hour[4].temp_c}`,
    },
    {
      time: '5Am',
      deg: `${val.forecast.forecastday[0].hour[5].temp_c}`,
    },
    {
      time: '6Am',
      deg: `${val.forecast.forecastday[0].hour[6].temp_c}`,
    },
  ];

  const [info, setInfo] = useState([
    {
      tittle: 'Sunrise',
      data: `${val.forecast.forecastday[0].astro.sunrise}`,
    },
    {
      tittle: 'Wind',
      data: `${val.current.wind_kph} km/h`,
    },
    {
      tittle: 'Precipitation',
      data: `${val.current.precip_mm} mm`,
    },
    {
      tittle: 'Sunset',
      data: `${val.forecast.forecastday[0].astro.sunset}`,
    },
    {
      tittle: 'Pressure',
      data: `${val.current.pressure_mb} mb`,
    },
    {
      tittle: 'Humidity',
      data: `${val.current.humidity} %`,
    },
  ]);

  const sixDayReport = val.forecast.forecastday.map(item => {
    return {
      day: days[new Date(item.date).getDay()],
      logo: item.day.condition.icon,
      deg: item.day.avgtemp_c,
      tempdec: item.day.mintemp_c,
      tempInc: item.day.maxtemp_c,
    };
  });

  console.log(sixDayReport);

  return (
    <LinearGradient
      colors={['#74a3cc20', '#155e9e']}
      style={styles.mainContainer}>
      <Text>Weather</Text>
      <View style={styles.box1}>
        <TextInput
          style={styles.Txtinpt}
          placeholderTextColor="#C1DFDB"
          placeholder="Search city"
          onChangeText={valu => getData(valu)}
        />
        <Pressable>
          <Text style={styles.btnTxt}>&deg;C</Text>
          {/* <Image
            style={styles.btnTxt}
            source={require('./Icons/weather.png')}
          /> */}
        </Pressable>
      </View>
      <View style={styles.box2}>
        {!expand ? (
          <Text style={styles.bTxt1}>{`${day}, ${month}, ${date}`}</Text>
        ) : (
          <Pressable onPress={() => setExpand(false)}>
            <Image
              style={styles.dwnBtn}
              source={require('./Icons/downarrow.png')}
            />
          </Pressable>
        )}
        <Text style={styles.bTxt2}>{val.location.name}</Text>
        <Text style={styles.bTxt3}>{val.location.country}</Text>
      </View>
      {!expand && (
        <View style={styles.box3}>
          <View>
            <Text style={styles.b3Txt1}>{val.current.temp_c}&deg;</Text>
            <Text style={styles.b3Txt2}>
              {`Feels like ${val.current.feelslike_c}`}&deg;
            </Text>
            <View style={styles.b3contnr}>
              <Image
                style={styles.downArrow}
                source={require('./Icons/downarrow.png')}
              />
              <Text style={styles.b3Txt3}>
                {`${val.forecast.forecastday[0].hour[0].windchill_c}`}&deg;
              </Text>
              <Image
                style={styles.upArrow}
                source={require('./Icons/downarrow.png')}
              />
              <Text style={styles.b3Txt4}>
                {`${val.forecast.forecastday[0].hour[0].heatindex_c}`}&deg;
              </Text>
            </View>
          </View>
          <Image
            style={styles.sunImg}
            source={{uri: `http:${val.current.condition.icon}`}}
          />
        </View>
      )}
      <Text style={styles.mainTxt}>{val.current.condition.text}</Text>
      <View>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={DATA}
          renderItem={({item}) => (
            <View style={styles.box4}>
              <Text style={styles.b4Txt1}>{item.time}</Text>
              <Text style={styles.b4Txt2}>{item.deg}&deg;</Text>
            </View>
          )}
        />
      </View>
      {expand && (
        <View style={styles.RepMainContnr}>
          <FlatList
            data={sixDayReport}
            renderItem={({item}) => (
              <View style={styles.Weekreportmap}>
                <Text style={styles.days}>{item.day}</Text>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Image
                    style={styles.reportlogo}
                    source={{uri: `http:${item.logo}`}}
                  />
                  <Text style={styles.tmpdeg}>{item.deg}&deg;</Text>
                  <View style={styles.b3contnr}>
                    <Image
                      style={styles.downArrow}
                      source={require('./Icons/downarrow.png')}
                    />
                    <Text style={styles.b3Txt3}>
                      {`${val.forecast.forecastday[0].hour[0].windchill_c}`}
                      &deg;
                    </Text>
                    <Image
                      style={styles.upArrow}
                      source={require('./Icons/downarrow.png')}
                    />
                    <Text style={styles.b3Txt4}>
                      {`${val.forecast.forecastday[0].hour[0].heatindex_c}`}
                      &deg;
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      )}
      <View style={styles.box5}>
        {info.map(items => (
          <View style={styles.b5contnr1} key={items.tittle}>
            <Text style={styles.b5contnr1Txt1}>{items.tittle}</Text>
            <Text style={styles.b5contnr1Txt2}>{items.data}</Text>
          </View>
        ))}
      </View>
      {!expand && (
        <Pressable onPress={() => setExpand(true)}>
          <Image
            style={styles.upBtn}
            source={require('./Icons/downarrow.png')}
          />
        </Pressable>
      )}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#2daad8',
  },
  box1: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 10,
  },
  Txtinpt: {
    width: '85%',
    height: 35,
    borderRadius: 20,
    backgroundColor: '#2242D820',
    paddingLeft: 20,
  },
  btnTxt: {
    fontSize: 25,
    color: 'white',
  },
  box2: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  bTxt1: {
    color: '#ffffff90',
    marginVertical: 20,
  },
  bTxt2: {
    color: '#ffffff',
    marginBottom: 10,
    fontSize: 28,
  },
  bTxt3: {
    color: '#ffffff60',
    marginBottom: 10,
  },
  box3: {
    display: 'flex',
    height: 130,
    flexDirection: 'row',
    // borderWidth: 1,
  },
  sunImg: {
    height: 120,
    width: 120,
    marginLeft: 70,
  },
  b3Txt1: {
    fontSize: 40,
    color: 'white',
    marginLeft: 60,
  },
  b3Txt2: {
    color: '#ffffff60',
    marginVertical: 5,
    marginLeft: 40,
  },
  b3contnr: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginLeft: 30,
    marginTop: 10,
  },
  b3Txt3: {
    color: '#ffffff80',
    marginRight: 20,
  },
  b3Txt4: {
    color: '#ffffff80',
  },
  downArrow: {
    height: 15,
    width: 15,
    tintColor: '#ffffff80',
  },
  upArrow: {
    transform: [{rotate: '180deg'}],
    height: 15,
    width: 15,
    tintColor: '#ffffff80',
  },
  mainTxt: {
    fontSize: 25,
    textAlign: 'center',
    marginVertical: 10,
    color: 'white',
  },
  box4: {
    paddingHorizontal: 10,
    borderBottomColor: '#ffffff50',
    borderBottomWidth: 1,
    borderTopColor: '#ffffff50',
    borderTopWidth: 1,
  },
  b4Txt1: {
    color: '#ffffff60',
    paddingTop: 10,
  },
  b4Txt2: {
    fontSize: 20,
    color: 'white',
    paddingBottom: 10,
  },
  box5: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap',
    marginHorizontal: 15,
  },
  //   b5contnr1: {
  //     marginLeft: 20,
  //   },
  b5contnr1Txt2: {
    fontSize: 20,
    color: '#ffffff',
  },
  b5contnr1Txt1: {
    color: '#ffffff60',
  },
  b5contnr1: {
    marginLeft: 10,
    width: 100,
    height: 60,
    justifyContent: 'space-evenly',
  },
  box6: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 10,
    width: '90%',
    justifyContent: 'space-evenly',
  },
  upBtn: {
    height: 30,
    width: 25,
    tintColor: '#ffffff60',
    alignSelf: 'center',
    marginTop: 8,
    transform: [{rotate: '180deg'}],
  },
  dwnBtn: {
    height: 30,
    width: 25,
    tintColor: '#ffffff60',
    alignSelf: 'center',
    marginTop: 8,
  },

  ////////////////////////////////////////

  RepMainContnr: {
    height: '25%',
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff60',
  },
  days: {
    width: 90,
    color: '#ffffff',
    fontWeight: '800',
  },
  Weekreportmap: {
    width: '90%',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'space-between',
    paddingBottom: 10,
    marginTop: 10,
    alignItems: 'center',
  },
  reportlogo: {
    height: 20,
    width: 20,
  },
  temprtr: {
    color: '#ffffff60',
  },
  tmpdeg: {
    color: '#ffffff',
    fontWeight: '800',
    flex: 1,
    paddingLeft: 30,
  },
});

export default Wheather;
