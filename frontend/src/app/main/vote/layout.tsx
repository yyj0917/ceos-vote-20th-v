import NavigationBar from "@/components/navigation-bar";


export default function VoteLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <div className="relative w-full h-full">
            {children}
            <NavigationBar/>
        </div>
    )
}