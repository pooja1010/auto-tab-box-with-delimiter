# auto-tab-box-with-delimiter
This repository is to create dynamic boxes with use of angular js.

Here you can see an HTML file with .css and .js file of delimitater. You need to import this file in your project.
In HTML :
      <div delimiter-box delimiter="{{Deliminater}}" box-before="{{Box_Before_Deliminater}}"
         box-after="{{Box_After_Deliminater}}" is-required="{{IsRequired}}"
         is-disabled="{{IsDisabled}}" submit-answer="submitAnswer()" answer="Answer"></div>
         
Here delimiter-box is required. Then you can specify any delimiter in delimiter attribute. You can even write it as:
     <div delimiter-box delimiter="." box-before="3"
         box-after="{{Box_After_Deliminater}}" is-required="{{IsRequired}}"
         is-disabled="{{IsDisabled}}" submit-answer="submitAnswer()" answer="Answer"></div>
