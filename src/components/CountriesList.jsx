import styles from './CountryList.module.css'
import Spinner from "./Spinner";
import Message from "./Message";
import CountryItem from './CountryItem';


export default function CountriesList({ cities, isLoading }) {
const countries = cities.reduce((arr, city) => {
  if (!arr.map(el => el.city).includes(city.country)) 
  {return [...arr, {country: city.country, emoji:city.emoji}]}
  else return arr
}, []);

  if (isLoading) return <Spinner />;

  if (!cities.length) return  <Message message='Add your first city by clicking on a city on the map' />



  return (
    <ul className={styles.countriesList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}
