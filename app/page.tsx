/** @format */

import getCurrentUser from "./actions/getCurrentUser";
import getListings from "./actions/getListings";
import ClientOnly from "./components/ClientOnly";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import ListingCard from "./components/listings/ListingCard";
export default async function Home() {
	const isEmpty = true;
	const listings = await getListings();
	const currentUser = getCurrentUser();
	if (listings.length === 0) {
		<ClientOnly>
			<EmptyState showReset />
		</ClientOnly>;
	}
	return (
		<ClientOnly>
			<Container>
				<div className="pt-24 grid grid-cols-1  sm:grids-cols-2 md:grids-cols-3 lg:grid-cols-4 xl:grids-cols-5 2xl:grids-cols-6 gap-8">
					{listings.map((listing) => {
						return (
							<ListingCard
								key={listing.id}
								data={listing}
								currentUser={currentUser}
							/>
						);
					})}
				</div>
			</Container>
		</ClientOnly>
	);
}
