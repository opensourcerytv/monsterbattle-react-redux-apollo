import React from 'react';
import { ApolloClient, ApolloProvider, createNetworkInterface } from 'react-apollo';

const networkInterface = createNetworkInterface({
  uri: `http://localhost:3666/graphql`,
});

const client = new ApolloClient({
  networkInterface: networkInterface,
});

class GraphQLProvider extends React.Component {
	render() {
		return (
			<ApolloProvider client={client}>
				{this.props.children}
			</ApolloProvider>
		);
	}
}
export default GraphQLProvider;