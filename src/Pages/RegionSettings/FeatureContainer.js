/**   backend - 22.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import PropTypes from "prop-types";
import TextInput from "../../TextInput";
import "./styles.css"

const FeatureContainer = ({label, feature_key, quality_spring, quality_summer, quality_autumn, quality_winter, onChange}) => (
    <div className={"feature_container use_box_shadow"}>
        <div>
            <span className={"feature_label"}>{label}</span> <span className={"feature_key"}>[{feature_key}]</span>
        </div>
        <div className={"col_container"}>
            <TextInput label={"Spring"} onChange={onChange} type={"number"} value={quality_spring}
                       name={feature_key + "$spring"}/>
            <TextInput label={"summer"} onChange={onChange} type={"number"} value={quality_summer}
                       name={feature_key + "$summer"}/>
            <TextInput label={"autumn"} onChange={onChange} type={"number"} value={quality_autumn}
                       name={feature_key + "$autumn"}/>
            <TextInput label={"winter"} onChange={onChange} type={"number"} value={quality_winter}
                       name={feature_key + "$winter"}/>
        </div>
    </div>


);

FeatureContainer.propTypes = {
    label: PropTypes.string,
    feature_key: PropTypes.string,
    quality_spring: PropTypes.string,
    quality_summer: PropTypes.string,
    quality_autumn: PropTypes.string,
    quality_winter: PropTypes.string,
    onChange: PropTypes.func
};

export default FeatureContainer;
