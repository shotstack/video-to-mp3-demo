'use strict';

const Joi = require('joi');

const validateBody = (body) => {
    const schema = Joi.object({
        video: Joi.string().uri().min(2).max(300).required(),
        speed: Joi.number().min(0.25).max(2).precision(1).default(1),
        preservePitch: Joi.boolean().default(true),
    });

    return schema.validate({ ...body });
};

const prepareRequestJson = (body) => {
    const valid = validateBody(body);

    if (valid.error) {
        throw new Error(valid.error.details[0].message);
    }

    const { video: videoUrl, speed = 1, preservePitch = true } = body;

    return {
        "url": videoUrl,
        "outputs": {
            "renditions": [
                {
                    "format": "mp3",
                    "speed": {
                        "speed": parseFloat(speed),
                        "preservePitch": !!preservePitch
                    }
                }
            ]
        }
    };
};

module.exports = {
    prepareRequestJson,
};
