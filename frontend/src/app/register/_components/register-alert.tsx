import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function RegisterAlert() {
    return (
        <AlertDialog>
            <AlertDialogTrigger>Open alert</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Alert title</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    This is an alert description
                </AlertDialogDescription>
                <AlertDialogFooter>
                    {/* <AlertDialogAction>Cancel</AlertDialogAction> */}
                    <AlertDialogAction>Accept</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
