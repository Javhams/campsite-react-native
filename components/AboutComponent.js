import React, {Component} from 'react';
import { FlatList, ScrollView, Text } from 'react-native';
import { Card, ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseUrl } from '../shared/baseUrl';

import * as Animatable from 'react-native-animatable';

import Loading from './LoadingComponent';

const mapStateToProps = state => {
    return {
        partners: state.partners
    };
};

// Mission component to be rendered on the About component
function Mission(){
    return(
        <Card title="Our Mission">
            <Text style={{margin: 10}, {textAlign: "justify"}}> 
            We present a curated database of the best campsites in the 
            vast woods and backcountry of the World Wide Web Wilderness. 
            We increase access to adventure for the public while promoting
            safe and respectful use of resources. The expert wilderness 
            trekkers on our staff personally verify each campsite to make
            sure that they are up to our standards. We also present a 
            platform for campers to share reviews on campsites they have 
            visited with each other.
            </Text>
        </Card>
    );
}

class About extends Component {
    // Adding the about us page to the navigation options
    static navigationOptions = {
        title: 'About Us'
    }
    // Rendering process for the About Us page
    render(){
        /*renderPartner lists all the partners contained in the partners.js file
        It is retrieved from the partners.js file that is passed as state by
        the main return statement(render return), then is received by renderPartner
        function and this function returns the partners rendered through the ListItem
        component and listed with the FlastList component from React Native */
        const renderPartner = ({item}) => {
            return (
                <ListItem 
                    title={item.name}
                    subtitle={item.description}
                    leftAvatar={{source: {uri: baseUrl + item.image}}}
                />
            );
        };
        if(this.props.partners.isLoading) {
            return (
                <ScrollView>
                    <Mission />
                    <Card
                        title='Community Partners'>
                            <Loading />
                    </Card>
                </ScrollView>
            );
        }
        if (this.props.partners.errMess) {
            return (
                <ScrollView>
                    <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                        <Mission />
                        <Card
                            title="Community Partners">
                            <Text>{this.props.partners.errMess}</Text>
                        </Card>
                    </Animatable.View>
                </ScrollView>
            );
        }
        return (
            <ScrollView>
                <Animatable.View animation='fadeInDown' duration={2000} delay={1000}>
                    <Mission />
                    <Card
                        title="Community Partners">
                        <FlatList
                            data={this.props.partners.partners}
                            renderItem={renderPartner}
                            keyExtractor={item=>item.id.toString()}
                        />
                    </Card>
                </Animatable.View>
            </ScrollView>
        );
    }
}

export default connect(mapStateToProps)(About);