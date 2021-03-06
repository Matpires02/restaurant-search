import React, { useState } from 'react';
import logo from '../../assets/logo.svg';
import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import restaurante from '../../assets/restaurante-fake.png';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';
import { Container, Search, Logo, Wrapper, CarouselTitle, Carousel, ModalTitle, ModalContent } from './styles.js'
import { useSelector } from 'react-redux';


const Home = () => {
    const [inputValue, setImputValue] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [placeId, setPlaceId] = useState(null)
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants)

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
    };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceId(placeId);
        setModalOpen(true);
    }

    return (
        <Wrapper>
            <Container>
                <Search>
                    <Logo src={logo} alt="Logo do restaurante" />
                    <TextField
                        label='Pesquisar restaurantes'
                        outlined
                        //onTrailingIconSelect={() => this.setState({value: ''})}
                        trailingIcon={<MaterialIcon role="button" icon="search" />}
                    ><Input
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setImputValue(e.target.value)} />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) => <Card
                                    key={restaurant.place_id}
                                    photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurante}
                                    title={restaurant.name} />)}
                            </Carousel>
                        </>) : <Loader />}

                </Search>
                {restaurants.map((restaurant) => 
                <RestaurantCard onClick={() => handleOpenModal(restaurant.place_id)} restaurant={restaurant} />)}
            </Container>
            <Map query={query} placeId={placeId} />
            <Modal open={modalOpen} onClose={() => setModalOpen(!modalOpen)}>
                {restaurantSelected ? (
                    <>
                        <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                        <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                        <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                        <ModalContent>{restaurantSelected?.opening_hours?.open_now ? 'Aberto Agora :-)' : 'Fechado nesse momento :-('}</ModalContent>

                </>):(
                    <>
                        <Skeleton width='10px' height='10px'/>
                        <Skeleton width='10px' height='10px'/>
                        <Skeleton width='10px' height='10px'/>
                        <Skeleton width='10px' height='10px'/>
                    </>
                ) }
                </Modal>

        </Wrapper>
    )
}

export default Home;