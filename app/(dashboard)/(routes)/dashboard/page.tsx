import { UserButton } from "@clerk/nextjs";

const DashboardPage = () => {
	return (
		<div>
			<p>Dashboard (Protected)</p>
			<UserButton afterSignOutUrl="/" />
		</div>
	)
}

export default DashboardPage;
