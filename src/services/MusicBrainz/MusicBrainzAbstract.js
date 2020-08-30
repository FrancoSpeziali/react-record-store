class MusicBrainzAbstractError extends Error {
}

export default class MusicBrainzAbstract {

    constructor() {
        this.api = 'https://musicbrainz.org/ws/2/';
        this.headers = new Headers({
            'Accept': 'application/json',
            'User-Agent': 'DCI/React Record Store Demo'
        });
    }

    async requestResource(resource) {
        if (!resource) {
            throw new MusicBrainzAbstractError('No resource specified');
        }

        try {
            const response = await fetch(`${this.api}${resource}`, {
                headers: this.headers
            });

            return response.json();
        } catch (error) {
            throw new MusicBrainzAbstractError(error);
        }
    }
}
