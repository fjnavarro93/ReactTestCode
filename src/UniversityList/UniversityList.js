import React, {useState, useEffect}  from "react";
import Spinner from "../_components/Spinner"
import './UniversityList.css';

const UniversityList = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [searchFilter, setFilter] = useState("");
    const [searchParam] = useState(["name"]);

    useEffect(() => {
        fetch("https://cors-everywhere.herokuapp.com/http://universities.hipolabs.com/search?country=Mexico") 
        //Se utilizó esta url debido a que el sitio gib publicado es https, y el api usa http, entonces no permite realizar
        //el fetch por tema de seguridad
            .then(res => res.json())
            .then(
                ( data ) => {
                    setIsLoaded(true);
                    setItems(data);
                },
                ( error ) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
      }, [])

    function search(items) {
        return items.filter((item) => {
            return searchParam.some((newItem) => {
                return (
                    item[newItem]
                        .toString()
                        .toLowerCase()
                        .indexOf(searchFilter.toLowerCase()) > -1
                );
            });
        });
    }

    if (error) {
            return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div className="center-screen-spinner"><Spinner /></div>;
    } else {
        return (
            <div className="container">
                <div>                    
                    <div className="row">
                        <div className="col-6 text-left"><h2>Universidades</h2></div>
                        <div className="col-6 text-right">
                            <label htmlFor="search-form">
                                <input
                                    type="search" 
                                    name="search-form"
                                    id="search-form"
                                    className="form-control me-2"
                                    placeholder="Buscar..."
                                    value={searchFilter}
                                    onChange={(e) => setFilter(e.target.value)}
                                />
                            </label>
                        </div>
                    </div>
                </div>
                <div className="d-flex flex-wrap">
                    {search(items).map((item) => (
                        <UniveristyCard items={item}/>
                    ))}
                </div>
            </div>
        );
    }
}

function UniveristyCard(props) {
    return (
        <div className="card" style={{width: 25 + 'rem'}}>
            <div className="card-body">
                <h5 className="card-title text-truncate" title={props.items.name}>{props.items.name}</h5>
                <p className="card-text">
                    <b>Ubicación:</b> {props.items.country}<br/>
                    <b>Dominio:</b> {props.items.domains}
                </p>
                <a href={props.items.web_pages} className="btn btn-primary" target="_blank">Visitar</a><br/><hr/>
                <small className="text-muted">{props.items.name}</small>
            </div>
        </div>
    );
}

export default UniversityList;