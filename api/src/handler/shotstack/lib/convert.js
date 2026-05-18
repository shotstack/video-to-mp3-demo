'use strict';

const Joi = require('joi');

// Stream-ripping these violates their ToS and Shotstack's Ingest API cannot
// fetch a media file from a watch-page URL anyway (it just hangs). Reject early
// with a clear message instead of accepting a job that can never complete.
const BLOCKED_HOSTS = [
    'youtube.com',
    'youtu.be',
    'm.youtube.com',
    'music.youtube.com',
    'soundcloud.com',
    'open.spotify.com',
];

const mediaUrl = Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .min(2)
    .max(300)
    .required()
    .custom((value, helpers) => {
        let host;
        try {
            host = new URL(value).hostname.toLowerCase().replace(/^www\./, '');
        } catch (e) {
            return helpers.error('any.invalid');
        }
        if (BLOCKED_HOSTS.some((h) => host === h || host.endsWith('.' + h))) {
            return helpers.error('any.invalid');
        }
        return value;
    }, 'direct media url')
    .messages({
        'any.invalid':
            'Enter a direct link to a video file (e.g. https://yourdomain.com/video.mp4). YouTube and other streaming-site links are not supported.',
        'string.uriCustomScheme': 'The video URL must start with http:// or https://.',
    });

const validateBody = (body) => {
    const schema = Joi.object({
        video: mediaUrl,
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
