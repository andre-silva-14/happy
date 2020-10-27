import Orphanage from '../models/Orphanage';
import imagesView from './images_views';

export default {
    render(orphanage: Orphanage) {
        return {
            name: orphanage.id,
            latitude: orphanage.id,
            longitude: orphanage.id,
            about: orphanage.about,
            instructions: orphanage.instructions,
            opening_hours: orphanage.opening_hours,
            open_on_weekends: orphanage.open_on_weekends,
            images: imagesView.renderMany(orphanage.images),
        };
    },

    renderMany(orphanages: Orphanage[]) {
        return orphanages.map(orphanage => this.render(orphanage));
    }
}