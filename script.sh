HOST=35.160.249.120;
PORT=8082;
python try.py     
rc=$?;
if [[ $rc == 0 ]]; 
then
curl $HOST:$PORT/build?status=pass
else
curl $HOST:$PORT/build?status=fail
exit $rc; 
fi
