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

  type AlertSubmitProps = {
    handleSubmit: () => void;
    }
  
  export function AlertSubmit({handleSubmit} : AlertSubmitProps) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"primary"} className="bg-newRed text-white rounded-md hover:">제출하기</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>데모데이 투표</AlertDialogTitle>
            <AlertDialogDescription>
              정말 투표를 완료하시겠습니까?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>아니요</AlertDialogCancel>
            <AlertDialogAction onClick={handleSubmit}>
                넵
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  