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
  
  export function AlertResult() {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant={"primary"} className="bg-newRed text-white rounded-md hover:">결과 확인하기</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>데모데이 투표 결과</AlertDialogTitle>
            <AlertDialogDescription>
              MUSAI : 15표
                <br />
                CakeWay : 10표
                <br />
                CoffeeDeal : 5표
                <br />
                PhotoGround : 3표
                <br />
                AngelBridge : 2표
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction>확인</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )
  }
  