import React from 'react'
import { commonOtpField } from 'style'

export default function Default(props) {
    const {otp, inputRefs, handleChange} = props
    return (
        <div className="otp-input">
            {otp.map((digit, index) => (
                <input
                    key={index}
                    type="text"
                    value={digit}
                    onChange={(e) => handleChange(e, index)}
                    maxLength={1}
                    style={commonOtpField}
                    ref={inputRefs[index]}
                />
            ))}
        </div>
    )
}
