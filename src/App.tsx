import { Component } from "react";
import type { FormEvent } from "react";
import Info from './components/Info';
import Form from './components/Form';
import Weather from './components/Weather';
import type { AppState } from "./components/types";

const API_KEY: string = "f486adea06e0b68aaa90c5e0c20a2749";

export class App extends Component<{}, AppState> {
    state: AppState = {
        temp: undefined,
        city: undefined,
        country: undefined,
        pressure: undefined,
        sunset: undefined,
        error: undefined
    };

    gettingWeather = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const city = (e.currentTarget.elements.namedItem('city') as HTMLInputElement).value;

        if (city) {
            const api_url: Response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            const data: any = await api_url.json();

            const sunset: number = data.sys.sunset;
            const date: Date = new Date();
            date.setTime(sunset);
            const sunset_date: string =
                date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            this.setState({
                temp: data.main.temp,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined
            });
        } else {
            this.setState({
                temp: undefined,
                city: undefined,
                country: undefined,
                pressure: undefined,
                sunset: undefined,
                error: "Введите название города"
            });
        }
    };

    render() {
        return (
            <div className="wrapper">
                <div className="main">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-5 info">
                                <Info />
                            </div>
                            <div className="col-sm-7">
                                <Form weatherMethod={this.gettingWeather} />
                                <Weather 
                                    temp={this.state.temp}
                                    city={this.state.city}
                                    country={this.state.country}
                                    pressure={this.state.pressure}
                                    sunset={this.state.sunset}
                                    error={this.state.error}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;