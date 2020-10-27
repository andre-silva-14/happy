import Image from '../models/Image';
import host from '../config/host';

export default {
    render(image: Image) {
        return {
            name: image.id,
            url: `${host.baseUrl}uploads/${image.path}`,
        };
    },

    renderMany(images: Image[]) {
        return images.map(image => this.render(image));
    }
}