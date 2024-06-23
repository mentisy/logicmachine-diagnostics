echo "-- Copy frontend to store/data/lm-diagnostics folder"
cp frontend/dist/* dist/store/data/lm-diagnostics/ -r

echo "-- Copy backend to store/data/lm-diagnostics folder"
mkdir dist/store/data/lm-diagnostics/api -p
cp backend/* dist/store/data/lm-diagnostics/api/ -r

cd dist || exit
echo "-- Compress app files"
tar -czvf control.tar.gz control
tar -czvf data.tar.gz store
cd ../

echo "-- Move control and data files"
mv dist/control.tar.gz ./
mv dist/data.tar.gz ./

echo "-- Compress app"
tar -czvf lm-diagnostics.ipk control.tar.gz data.tar.gz

echo "-- Remove compressed app files"
rm control.tar.gz data.tar.gz

echo "-- Remove dynamic data"
rm dist/store/data/lm-diagnostics/* -r

echo "-- Finished without a hitch :)"
