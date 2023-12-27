pid=$(ps -ef | grep app-0.0.1 | grep -v grep | sed 's/^\s*//' | awk '{print $2}')
echo "PID:"$pid
kill -9 $pid