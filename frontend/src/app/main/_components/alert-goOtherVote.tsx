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
  import { Button } from "@/components/button"

  type GoOtherVoteProps = {
    handleGoOtherVote: () => void
    }
  
  export function GoOtherVote({handleGoOtherVote} : GoOtherVoteProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"primary"} className="bg-newRed text-white rounded-md hover:">다른 투표</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>다른 투표</AlertDialogTitle>
            <AlertDialogDescription>
              다른 투표 화면으로 넘어가시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니요</AlertDialogCancel>
            <AlertDialogAction onClick={handleGoOtherVote}>
                넵
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  