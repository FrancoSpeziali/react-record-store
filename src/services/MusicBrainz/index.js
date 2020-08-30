import MusicBrainzAbstract from './MusicBrainzAbstract';

class MusicBrainzError extends Error {
}

class MusicBrainz extends MusicBrainzAbstract {

    async searchForArtistId(queryString) {
        const resource = `artist?query=${queryString}`;

        try {
            const response = await this.requestResource(resource);

            if (response &&
                response.artists &&
                Array.isArray(response.artists) &&
                response.artists.length > 0) {
                return response.artists[0].id;
            }
        } catch (error) {
            throw new MusicBrainzError(error);
        }
    }

    async getAlbumsByArtistId(mbid) {
        const resource = `release-group?artist=${mbid}&type=album`;

        try {
            const response = await this.requestResource(resource);

            if (response &&
                response['release-groups'] &&
                Array.isArray(response['release-groups']) &&
                response['release-groups'].length > 0) {
                return response['release-groups'].map((record) => {
                    return {
                        title: record.title,
                        date: record['first-release-date'],
                        id: record.id
                    }
                });
            }
        } catch (error) {
            throw new MusicBrainzError(error);
        }
    }

    async getAlbumsBySearchArtist(queryString) {
        try {
            const artistId = await this.searchForArtistId(queryString);

            if (artistId) {
                return this.getAlbumsByArtistId(artistId);
            }
        } catch (error) {
            throw new MusicBrainzError(error);
        }
    }
}

export default new MusicBrainz();
