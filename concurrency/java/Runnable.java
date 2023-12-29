import java.lang.Runnable

class MyThread implements Runnable{  
    private int ticket=10;  
    public void run(){
        for(int i=0;i<20;i++){ 
            if(this.ticket>0){
                System.out.println(Thread.currentThread().getName()+"num:"+this.ticket--);
            }
        }
    } 
}; 

public class Runnable{  
    public static void main(String[] args) {  
        MyThread mt=new MyThread();

        Thread t1=new Thread(mt);
        Thread t2=new Thread(mt);
        Thread t3=new Thread(mt);
        t1.start();
        t2.start();
        t3.start();
    }  
}
