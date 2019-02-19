/**   backend - 22.10.2018
 *    Created by Florian Haimerl (florian.haimerl@tum.de)
 */

import React from 'react';
import PropTypes from "prop-types";
import TextInput from "../../TextInput";
import "./styles.css"

const ActivityContainer = ({label, activity_key, quality_spring, quality_summer, quality_autumn, quality_winter, onChange}) => (
    <div className={"activity_container use_box_shadow"}>
        <div>
            <span className={"activity_label"}>{label}</span> <span className={"activity_key"}>[{activity_key}]</span>
        </div>
        <div className={"col_container"}>
            {
                [
                    {label: 'Summer', name_suffix: 'summer'},
                    {label: 'Autumn', name_suffix: 'autumn'},
                    {label: 'Winter', name_suffix: 'winter'},
                    {label: 'Spring', name_suffix: 'spring'}
                ].map(field => {
                    return (<TextInput label={field.label} onChange={onChange} value={quality_spring}
                               name={activity_key + "$" + field.name_suffix}/>)
                })
            }
        </div>
    </div>
);

ActivityContainer.propTypes = {
    label: PropTypes.string,
    activity_key: PropTypes.string,
    quality_spring: PropTypes.string,
    quality_summer: PropTypes.string,
    quality_autumn: PropTypes.string,
    quality_winter: PropTypes.string,
    onChange: PropTypes.func
};

export default ActivityContainer;
