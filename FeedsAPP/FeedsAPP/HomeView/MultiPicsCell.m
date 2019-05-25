//
//  MulitiPicsCell.m
//  FeedsAPP
//
//  Created by student4 on 2019/5/18.
//  Copyright © 2019 iosGroup. All rights reserved.
//

#import "MultiPicsCell.h"
#import "XWScanImage.h"

@implementation MultiPicsCell
-(void) setModel:(HomeViewModel *)model
{
    _model = model;
    
    _titleLabel.text = _model.title;
    _model.imageType = 2;
    _leftImage.image = [UIImage imageNamed:_model.leftImage];
    _rightImage.image = [UIImage imageNamed:_model.rightImage];
    _middleImage.image = [UIImage imageNamed:_model.middleImage];
    _infoLabel.text = _model.info;
    
    //big img right
    //为UIImageView1添加点击事件
    UITapGestureRecognizer *tapGestureRecognizer1 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(scanBigImageClick1:)];
    [_leftImage addGestureRecognizer:tapGestureRecognizer1];
    //让UIImageView和它的父类开启用户交互属性
    [_leftImage setUserInteractionEnabled:YES];
    
    
    //为UIImageView2添加点击事件
    UITapGestureRecognizer *tapGestureRecognizer2 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(scanBigImageClick2:)];
    [_middleImage addGestureRecognizer:tapGestureRecognizer2];
    [_middleImage setUserInteractionEnabled:YES];
    
    //为UIImageView3添加点击事件
    UITapGestureRecognizer *tapGestureRecognizer3 = [[UITapGestureRecognizer alloc] initWithTarget:self action:@selector(scanBigImageClick3:)];
    [ _rightImage addGestureRecognizer:tapGestureRecognizer3];
    [ _rightImage setUserInteractionEnabled:YES];
    
    
    
}
- (void)awakeFromNib {
    [super awakeFromNib];
    // Initialization code
    _imageViews = @[_leftImage,_middleImage,_rightImage];
}

- (void)setSelected:(BOOL)selected animated:(BOOL)animated {
    [super setSelected:selected animated:animated];

    // Configure the view for the selected state
    
    
}

#pragma mark - 浏览大图点击事件
-(void)scanBigImageClick1:(UITapGestureRecognizer *)tap{
    NSLog(@"点击图片");
    UIImageView *clickedImageView = (UIImageView *)tap.view;
    [XWScanImage scanBigImageWithImageView:clickedImageView];
}

-(void)scanBigImageClick2:(UITapGestureRecognizer *)tap{
    NSLog(@"点击图片");
    UIImageView *clickedImageView = (UIImageView *)tap.view;
    
    [XWScanImage scanBigImageWithImageView:clickedImageView];
    
}
-(void)scanBigImageClick3:(UITapGestureRecognizer *)tap{
    NSLog(@"点击图片");
    UIImageView *clickedImageView = (UIImageView *)tap.view;
    
    UIWindow *window = [UIApplication sharedApplication].keyWindow;
    [XWScanImage scanBigImageWithImage:clickedImageView.image frame:[clickedImageView convertRect:clickedImageView.bounds toView:window]];
    
}

@end
