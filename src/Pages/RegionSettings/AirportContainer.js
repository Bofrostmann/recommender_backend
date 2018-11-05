/**   backend - 05.11.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import PropTypes from "prop-types";
import TextInput from "../../TextInput";
import "./styles.css"

const AirportContainer = ({name, iata_code, city, onChange, id}) => (
    <div className={"airport_container use_box_shadow"}>
        <div className={"col_container"}>
            <TextInput label={"Name"} onChange={onChange} value={name}
                       name={"airport_name$" + id}/>
            <TextInput label={"City"} onChange={onChange} value={city}
                       name={"airport_city$" + id}/>
            <TextInput label={"IATA-Code"} onChange={onChange} value={iata_code}
                       name={"airport_iata_code$" + id}/>
        </div>
    </div>


);

AirportContainer.propTypes = {
    name: PropTypes.string,
    iata_code: PropTypes.string,
    city: PropTypes.string,
    onChange: PropTypes.func
};

export default AirportContainer;